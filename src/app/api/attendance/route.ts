import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { enrollmentId, date, status } = await req.json();
  const record = await prisma.attendance.create({
    data: { enrollmentId, date: new Date(date), status },
  });
  return NextResponse.json(record);
}
