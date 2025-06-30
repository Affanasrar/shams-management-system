import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: list courses
export async function GET() {
  const courses = await prisma.course.findMany({
    include: { slots: true },
  });
  return NextResponse.json(courses);
}

// POST: create course
export async function POST(req: Request) {
  const body = await req.json();
  const course = await prisma.course.create({
    data: {
      title: body.title,
      type: body.type,
      durationMonths: body.durationMonths,
      feeMonthly: body.feeMonthly,
      feePackage: body.feePackage,
      instructorId: body.instructorId ?? null,
    },
  });
  return NextResponse.json(course);
}

// PUT: update course
export async function PUT(req: Request) {
  const body = await req.json();
  const updated = await prisma.course.update({
    where: { id: body.id },
    data: {
      title: body.title,
      type: body.type,
      durationMonths: body.durationMonths,
      feeMonthly: body.feeMonthly,
      feePackage: body.feePackage,
      instructorId: body.instructorId ?? null,
    },
  });
  return NextResponse.json(updated);
}

// DELETE: delete course
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
