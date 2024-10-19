import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/axios";

export async function POST(req) {
  const data = await req.formData();
  const url = await uploadFile(data);
  return NextResponse.json({ url }, { status: 200, statusText: "OK" });
}
