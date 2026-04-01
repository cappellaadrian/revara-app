import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_ASSEMBLIES = [
  { name: "Ext Wall - Brick Cavity", category: "wall", unit: "SF", description: "Face brick + air cavity + insulation + CMU backup + gypsum board",
    components: JSON.stringify([
      { description: "Face Brick Veneer", material: 8.50, labor: 12.00, equipment: 0.75, wasteFactor: 5 },
      { description: "Air Cavity + Ties", material: 0.50, labor: 0.75, equipment: 0, wasteFactor: 0 },
      { description: "Rigid Insulation 2\"", material: 1.80, labor: 0.85, equipment: 0, wasteFactor: 3 },
      { description: "8\" CMU Backup", material: 5.50, labor: 8.50, equipment: 0.50, wasteFactor: 5 },
      { description: "5/8\" Gypsum Board", material: 0.85, labor: 1.50, equipment: 0, wasteFactor: 5 },
      { description: "Paint - 2 coats", material: 0.35, labor: 0.65, equipment: 0.05, wasteFactor: 10 },
    ]), totalCost: 42.55 },
  { name: "Ext Wall - Metal Panel", category: "wall", unit: "SF", description: "Metal panel + insulation + steel studs + gypsum board",
    components: JSON.stringify([
      { description: "Metal Wall Panel", material: 14.00, labor: 8.00, equipment: 2.00, wasteFactor: 5 },
      { description: "Batt Insulation R-19", material: 1.25, labor: 0.65, equipment: 0, wasteFactor: 3 },
      { description: "6\" Metal Studs 16\" OC", material: 2.80, labor: 3.50, equipment: 0, wasteFactor: 5 },
      { description: "5/8\" Gypsum Board", material: 0.85, labor: 1.50, equipment: 0, wasteFactor: 5 },
      { description: "Paint - 2 coats", material: 0.35, labor: 0.65, equipment: 0.05, wasteFactor: 10 },
    ]), totalCost: 35.60 },
  { name: "Int Wall - Drywall on Steel Studs", category: "wall", unit: "SF", description: "Steel studs + drywall both sides + paint",
    components: JSON.stringify([
      { description: "3-5/8\" Metal Studs 16\" OC", material: 2.10, labor: 2.80, equipment: 0, wasteFactor: 5 },
      { description: "5/8\" Gypsum Board (2 sides)", material: 1.70, labor: 3.00, equipment: 0, wasteFactor: 5 },
      { description: "Taping & Finishing", material: 0.25, labor: 1.50, equipment: 0, wasteFactor: 0 },
      { description: "Paint - 2 coats (2 sides)", material: 0.70, labor: 1.30, equipment: 0.10, wasteFactor: 10 },
    ]), totalCost: 13.45 },
  { name: "Floor - Concrete on Metal Deck", category: "floor", unit: "SF", description: "Metal deck + concrete topping + rebar + finish",
    components: JSON.stringify([
      { description: "3\" Metal Deck", material: 3.50, labor: 2.00, equipment: 0.50, wasteFactor: 5 },
      { description: "3\" Concrete Topping", material: 2.80, labor: 2.50, equipment: 1.00, wasteFactor: 0 },
      { description: "WWM Reinforcing", material: 0.45, labor: 0.35, equipment: 0, wasteFactor: 10 },
      { description: "Concrete Finish", material: 0.15, labor: 0.85, equipment: 0, wasteFactor: 0 },
    ]), totalCost: 14.10 },
  { name: "Ceiling - Acoustic Tile", category: "ceiling", unit: "SF", description: "Suspended grid + 2x4 acoustic tiles",
    components: JSON.stringify([
      { description: "Suspension Grid System", material: 1.25, labor: 1.50, equipment: 0.25, wasteFactor: 5 },
      { description: "2x4 Acoustic Tile", material: 1.50, labor: 0.75, equipment: 0, wasteFactor: 5 },
    ]), totalCost: 5.25 },
  { name: "Roof - Single-Ply Membrane", category: "roof", unit: "SF", description: "TPO membrane + insulation + cover board",
    components: JSON.stringify([
      { description: "TPO Membrane 60mil", material: 3.50, labor: 2.50, equipment: 0.50, wasteFactor: 5 },
      { description: "Polyiso Insulation R-30", material: 2.80, labor: 0.85, equipment: 0, wasteFactor: 3 },
      { description: "Cover Board 1/2\"", material: 0.85, labor: 0.50, equipment: 0, wasteFactor: 5 },
      { description: "Adhesive/Fasteners", material: 0.45, labor: 0.25, equipment: 0, wasteFactor: 0 },
    ]), totalCost: 12.20 },
];

export async function GET() {
  let assemblies = await db.assembly.findMany({ orderBy: { name: "asc" } });
  if (assemblies.length === 0) {
    await db.assembly.createMany({ data: DEFAULT_ASSEMBLIES.map(a => ({ ...a, companyWide: true })) });
    assemblies = await db.assembly.findMany({ orderBy: { name: "asc" } });
  }
  return NextResponse.json(assemblies);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.components && Array.isArray(body.components)) {
    body.totalCost = body.components.reduce((s: number, c: { material: number; labor: number; equipment: number; wasteFactor?: number }) => {
      const base = (c.material || 0) + (c.labor || 0) + (c.equipment || 0);
      return s + base * (1 + (c.wasteFactor || 0) / 100);
    }, 0);
    body.components = JSON.stringify(body.components);
  }
  const item = await db.assembly.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
