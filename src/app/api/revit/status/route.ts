import { NextResponse } from "next/server";
import { checkRevitConnection } from "@/lib/revit-bridge";

export async function GET() {
  const status = await checkRevitConnection();
  return NextResponse.json(status);
}
