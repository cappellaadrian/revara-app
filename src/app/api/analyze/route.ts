import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mediaType = file.type || "image/png";

    // Use Claude Vision to analyze the floor plan
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
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64 },
              },
              {
                type: "text",
                text: `Analyze this floor plan image. Detect all rooms/spaces and return a JSON object with this exact structure:
{
  "rooms": [
    {"name": "Room Name", "area_sqm": 25.0, "center": {"x": 50, "y": 30}},
  ],
  "totalArea_sqm": 150.0,
  "wallCount": 20,
  "confidence": 85,
  "buildingJson": {
    "project": {"name": "Analyzed Plan"},
    "levels": [{"name": "Level 1", "elevation_mm": 0}],
    "walls": [
      {"levelName": "Level 1", "heightMm": 3000, "start": {"x": 0, "y": 0}, "end": {"x": 10000, "y": 0}}
    ],
    "rooms": [
      {"levelName": "Level 1", "name": "Room Name", "position": {"x": 5000, "y": 4000}}
    ]
  }
}

Rules:
- Room center coordinates are PERCENTAGES (0-100) of image width/height for overlay positioning
- Estimate areas in square meters based on typical room proportions
- Wall coordinates in the buildingJson are in MILLIMETERS (real-world dimensions)
- If you can read scale info from the plan, use it. Otherwise estimate from typical room sizes.
- Include ALL visible rooms, corridors, bathrooms, closets
- wallCount = approximate number of wall segments visible
- confidence = your confidence percentage in the detection accuracy (0-100)
- Return ONLY the JSON object, no markdown or explanation`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";

    // Parse the JSON from Claude's response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        return NextResponse.json(analysis);
      }
    } catch {
      // If JSON parsing fails, return a structured error
    }

    return NextResponse.json({
      rooms: [],
      totalArea_sqm: 0,
      wallCount: 0,
      confidence: 0,
      error: "Could not parse analysis results",
      raw: text.substring(0, 500),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
