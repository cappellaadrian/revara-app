import { NextRequest, NextResponse } from "next/server";
import { sendToRevit } from "@/lib/revit-bridge";

// Generic MCP tool executor — runs ANY of the 101 Revit MCP tools from the web app
// Usage: POST /api/revit/tool { tool: "create_level", params: { name: "Level 2", elevation: 3500 } }
export async function POST(req: NextRequest) {
  try {
    const { tool, params } = await req.json();

    if (!tool) {
      return NextResponse.json({ success: false, error: "tool name required" }, { status: 400 });
    }

    const result = await sendToRevit(tool, params || {});
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Tool execution failed",
    }, { status: 500 });
  }
}
