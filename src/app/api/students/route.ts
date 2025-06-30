import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: list all students
export async function GET() {
  const students = await prisma.student.findMany({
    include: { enrollments: true, payments: true },
  });
  return NextResponse.json(students);
}

// POST: create new student
export async function POST(req: Request) {
  const body = await req.json();
  const student = await prisma.student.create({
    data: {
      name: body.name,
      fatherName: body.fatherName,
      phone: body.phone,
      age: body.age,
      school: body.school,
      address: body.address,
    },
  });
  return NextResponse.json(student);
}

// PUT: update student
export async function PUT(req: Request) {
  const body = await req.json();
  const updated = await prisma.student.update({
    where: { id: body.id },
    data: {
      name: body.name,
      fatherName: body.fatherName,
      phone: body.phone,
      age: body.age,
      school: body.school,
      address: body.address,
    },
  });
  return NextResponse.json(updated);
}

// DELETE: delete student
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.student.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
