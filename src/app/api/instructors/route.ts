// /app/api/instructors/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const teachers = await prisma.user.findMany({ where: { role: "TEACHER" } });
  return NextResponse.json(teachers);
}
