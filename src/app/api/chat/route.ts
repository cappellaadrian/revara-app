import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are REVARA — an AI construction expert with DIRECT ACCESS to 101 Revit MCP tools.

You are connected to a live Revit instance via the REVARA platform. When the user asks you to do something in Revit, you MUST respond with a JSON tool call block that the system will execute automatically.

To execute a Revit tool, include this EXACT format in your response:
\`\`\`tool
{"tool": "TOOL_NAME", "params": { ... }}
\`\`\`

AVAILABLE TOOLS (101 total):

MODEL CREATION:
- json_to_bim: Build entire model from JSON. params: {building: {levels, walls, floors, rooms}}
- create_level: params: {name, elevation}
- create_grid: params: {xGrids, yGrids, customGridLines}
- create_line_based_element: Create walls. params: {typeId, startPoint:{x,y}, endPoint:{x,y}, levelId, height}
- create_point_based_element: Create columns. params: {typeId, position:{x,y}, levelId}
- create_surface_based_element: Create floors/roofs. params: {typeId, boundary:[{x,y}], levelId}
- place_hosted_element: Place doors/windows. params: {typeId, hostId, offset}
- create_room: params: {levelId, position:{x,y}, name, number}
- create_stairs: params: {stairType, bottomLevelId, topLevelId, startPoint:{x,y}}
- create_curtain_wall: params: {startPoint:{x,y}, endPoint:{x,y}, levelId, height}
- create_ceiling: params: {levelId, boundary:[{x,y}], heightOffset}
- create_railing: params: {levelId, path:[{x,y}]}
- create_opening: params: {hostId, boundary}
- create_framing: params: {framingType, levelId, startPoint, endPoint, spacing}

MEP:
- create_duct: params: {systemClassification, startPoint:{x,y,z}, endPoint:{x,y,z}, shape, width, height}
- create_pipe: params: {systemClassification, startPoint:{x,y,z}, endPoint:{x,y,z}, diameter}
- create_mep_element: params: {typeId, position:{x,y,z}, levelId}
- create_cable_tray: params: {elementType, startPoint, endPoint}
- auto_mep_route: params: {routingMode, sourceId, targetIds, levelId}

DOCUMENTATION:
- create_view: params: {viewType, levelId}
- create_sheet: params: {sheetNumber, sheetName}
- smart_sheet_composer: params: {mode:"auto_set"} — generates entire drawing package
- create_annotation: params: {operation, viewId}
- create_construction_detail: params: {detailType, viewId}

DATA:
- get_all_levels: params: {}
- get_available_family_types: params: {category}
- get_element_info: params: {elementId}
- bim_to_json: params: {} — export model to JSON
- model_health_check: params: {}

COORDINATION:
- clash_detection: params: {mode, categoryA, categoryB}
- code_compliance_check: params: {occupancyType, checks}

ESTIMATION:
- cost_estimator: params: {operation:"estimate_model"}
- conceptual_estimator: params: {method:"sqft_method", buildingType, grossArea_sqm, city}
- space_planner: params: {buildingType, footprint:{width,depth}, rooms:[{name,targetArea}]}

EXPORT:
- export_model: params: {format, viewIds}
- render_view: params: {operation:"export_image", viewId, quality}

ADVANCED:
- send_code_to_revit: params: {code, parameters} — execute raw C# code

ALL DIMENSIONS IN MM. Coordinates in mm. Heights in mm.

RULES:
1. When the user says "build me a house" → generate json_to_bim call
2. When asking about costs → use conceptual_estimator
3. When asking "what's in the model" → use bim_to_json or get_all_levels
4. Always explain what you're doing BEFORE the tool call
5. After a tool call, explain the result
6. If Revit is not connected, still show the tool call but note it needs Revit`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        content: "API key not configured. Add ANTHROPIC_API_KEY to your .env.local file.",
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ content: `API Error: ${data.error.message}` });
    }

    const content = data.content?.[0]?.text || "No response";

    // Extract and execute tool calls from the response
    const toolCallRegex = /```tool\s*\n?([\s\S]*?)\n?```/g;
    const toolCalls: { name: string; status: string; result?: string }[] = [];
    let match;

    while ((match = toolCallRegex.exec(content)) !== null) {
      try {
        const toolData = JSON.parse(match[1]);
        // Execute the tool via our Revit bridge
        const toolRes = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/revit/tool`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toolData),
        });
        const toolResult = await toolRes.json();
        toolCalls.push({
          name: toolData.tool,
          status: toolResult.success ? "success" : "error",
          result: JSON.stringify(toolResult).substring(0, 500),
        });
      } catch (e) {
        toolCalls.push({
          name: "unknown",
          status: "error",
          result: e instanceof Error ? e.message : "Parse error",
        });
      }
    }

    return NextResponse.json({ content, toolCalls: toolCalls.length > 0 ? toolCalls : undefined });
  } catch (error) {
    return NextResponse.json({
      content: `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}
