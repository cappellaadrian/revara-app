import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const shared = await db.sharedModel.findUnique({ where: { shareToken: params.token } });
  if (!shared) return NextResponse.json({ error: "Model not found or link expired" }, { status: 404 });

  // Increment view count
  await db.sharedModel.update({ where: { id: shared.id }, data: { viewCount: shared.viewCount + 1 } });

  return NextResponse.json({
    name: shared.name,
    filePath: shared.filePath,
    createdBy: shared.createdBy,
    viewCount: shared.viewCount + 1,
    createdAt: shared.createdAt,
  });
}
