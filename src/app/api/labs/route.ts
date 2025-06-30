// /app/api/labs/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const labs = await prisma.lab.findMany();
  return NextResponse.json(labs);
}
