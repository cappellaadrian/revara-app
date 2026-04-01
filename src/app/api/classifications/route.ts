import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_CLASSIFICATIONS = [
  // Area classifications
  { name: "Living Room", category: "area", color: "rgba(59,130,246,0.25)", costCode: "09", unit: "SF" },
  { name: "Bedroom", category: "area", color: "rgba(139,92,246,0.25)", costCode: "09", unit: "SF" },
  { name: "Bathroom", category: "area", color: "rgba(20,184,166,0.25)", costCode: "09", unit: "SF" },
  { name: "Kitchen", category: "area", color: "rgba(245,158,11,0.25)", costCode: "09", unit: "SF" },
  { name: "Dining Room", category: "area", color: "rgba(236,72,153,0.25)", costCode: "09", unit: "SF" },
  { name: "Corridor", category: "area", color: "rgba(156,163,175,0.25)", costCode: "09", unit: "SF" },
  { name: "Lobby", category: "area", color: "rgba(34,197,94,0.25)", costCode: "09", unit: "SF" },
  { name: "Office", category: "area", color: "rgba(59,130,246,0.25)", costCode: "09", unit: "SF" },
  { name: "Meeting Room", category: "area", color: "rgba(168,85,247,0.25)", costCode: "09", unit: "SF" },
  { name: "Storage", category: "area", color: "rgba(107,114,128,0.25)", costCode: "09", unit: "SF" },
  { name: "Utility Room", category: "area", color: "rgba(75,85,99,0.25)", costCode: "23", unit: "SF" },
  { name: "Stairwell", category: "area", color: "rgba(244,63,94,0.25)", costCode: "05", unit: "SF" },
  { name: "Elevator", category: "area", color: "rgba(220,38,38,0.25)", costCode: "14", unit: "SF" },
  { name: "Mechanical Room", category: "area", color: "rgba(234,88,12,0.25)", costCode: "23", unit: "SF" },
  { name: "Electrical Room", category: "area", color: "rgba(202,138,4,0.25)", costCode: "26", unit: "SF" },
  { name: "Closet", category: "area", color: "rgba(161,161,170,0.25)", costCode: "09", unit: "SF" },
  { name: "Garage", category: "area", color: "rgba(113,113,122,0.25)", costCode: "03", unit: "SF" },
  { name: "Balcony", category: "area", color: "rgba(16,185,129,0.25)", costCode: "03", unit: "SF" },
  { name: "Patio", category: "area", color: "rgba(5,150,105,0.25)", costCode: "32", unit: "SF" },
  { name: "Unclassified Area", category: "area", color: "rgba(209,213,219,0.25)", costCode: "", unit: "SF" },
  // Line classifications
  { name: "Exterior Wall", category: "line", color: "rgba(220,38,38,0.8)", costCode: "04", unit: "LF" },
  { name: "Interior Wall", category: "line", color: "rgba(59,130,246,0.8)", costCode: "09", unit: "LF" },
  { name: "Partition", category: "line", color: "rgba(156,163,175,0.8)", costCode: "09", unit: "LF" },
  { name: "Curtain Wall", category: "line", color: "rgba(139,92,246,0.8)", costCode: "08", unit: "LF" },
  { name: "Demising Wall", category: "line", color: "rgba(234,88,12,0.8)", costCode: "09", unit: "LF" },
  { name: "Fire Wall", category: "line", color: "rgba(239,68,68,0.8)", costCode: "09", unit: "LF" },
  { name: "Unclassified Wall", category: "line", color: "rgba(107,114,128,0.8)", costCode: "", unit: "LF" },
  // Count classifications
  { name: "Door", category: "count", color: "rgba(59,130,246,0.8)", costCode: "08", unit: "EA" },
  { name: "Window", category: "count", color: "rgba(16,185,129,0.8)", costCode: "08", unit: "EA" },
  { name: "Plumbing Fixture", category: "count", color: "rgba(20,184,166,0.8)", costCode: "22", unit: "EA" },
  { name: "Light Fixture", category: "count", color: "rgba(245,158,11,0.8)", costCode: "26", unit: "EA" },
  { name: "Electrical Outlet", category: "count", color: "rgba(234,88,12,0.8)", costCode: "26", unit: "EA" },
  { name: "HVAC Diffuser", category: "count", color: "rgba(139,92,246,0.8)", costCode: "23", unit: "EA" },
  { name: "Fire Sprinkler", category: "count", color: "rgba(239,68,68,0.8)", costCode: "21", unit: "EA" },
  { name: "Furniture", category: "count", color: "rgba(168,85,247,0.8)", costCode: "12", unit: "EA" },
  { name: "Appliance", category: "count", color: "rgba(75,85,99,0.8)", costCode: "11", unit: "EA" },
];

export async function GET() {
  let classifications = await db.classification.findMany({ orderBy: { name: "asc" } });

  // Auto-seed if empty
  if (classifications.length === 0) {
    await db.classification.createMany({
      data: DEFAULT_CLASSIFICATIONS.map(c => ({ ...c, companyWide: true })),
    });
    classifications = await db.classification.findMany({ orderBy: { name: "asc" } });
  }

  return NextResponse.json(classifications);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await db.classification.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
