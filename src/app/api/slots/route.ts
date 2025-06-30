import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: list slots
export async function GET() {
  const slots = await prisma.slot.findMany({
    include: { course: true, instructor: true, lab: true, enrollments: true },
  });
  return NextResponse.json(slots);
}

// POST: create slot
export async function POST(req: Request) {
  const body = await req.json();
  const slot = await prisma.slot.create({
    data: {
      courseId: body.courseId,
      labId: body.labId,
      instructorId: body.instructorId,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      capacity: body.capacity,
    },
  });
  return NextResponse.json(slot);
}

// PUT: update slot
export async function PUT(req: Request) {
  const body = await req.json();
  const updated = await prisma.slot.update({
    where: { id: body.id },
    data: {
      courseId: body.courseId,
      labId: body.labId,
      instructorId: body.instructorId,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      capacity: body.capacity,
    },
  });
  return NextResponse.json(updated);
}

// DELETE: delete slot
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.slot.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
