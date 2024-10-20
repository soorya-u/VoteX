import { NextResponse } from "next/server";
import { uploadJson } from "@/lib/pinata";

export async function POST(req) {
  const json = await req.json();
  const data = JSON.stringify(json);
  const url = await uploadJson(data);

  return NextResponse.json({ url }, { status: 200, statusText: "OK" });
}
