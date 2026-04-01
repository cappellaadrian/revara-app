import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  if (body.components && Array.isArray(body.components)) {
    body.totalCost = body.components.reduce((s: number, c: { material: number; labor: number; equipment: number; wasteFactor?: number }) => {
      const base = (c.material || 0) + (c.labor || 0) + (c.equipment || 0);
      return s + base * (1 + (c.wasteFactor || 0) / 100);
    }, 0);
    body.components = JSON.stringify(body.components);
  }
  const item = await db.assembly.update({ where: { id: params.id }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await db.assembly.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
