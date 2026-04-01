import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const projectId = formData.get("projectId") as string || "";
  const name = formData.get("name") as string || file?.name || "Model";
  const createdBy = formData.get("createdBy") as string || "User";

  if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

  // Save file
  const uploadsDir = path.join(process.cwd(), "uploads", "shared");
  await mkdir(uploadsDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, fileName);
  await writeFile(filePath, Buffer.from(bytes));

  // Generate unique share token
  const shareToken = crypto.randomBytes(16).toString("hex");

  const shared = await db.sharedModel.create({
    data: {
      projectId,
      name,
      filePath: `/uploads/shared/${fileName}`,
      shareToken,
      createdBy,
      isPublic: true,
    },
  });

  const shareUrl = `/share/${shareToken}`;

  return NextResponse.json({
    id: shared.id,
    shareToken,
    shareUrl,
    fullUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}${shareUrl}`,
    name,
  }, { status: 201 });
}
