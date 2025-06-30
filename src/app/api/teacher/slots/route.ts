import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find user in DB who is this clerk user
  const teacher = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!teacher || teacher.role !== "TEACHER") {
    return NextResponse.json({ error: "Teacher not found or invalid role" }, { status: 404 });
  }

  // Get slots where this user is instructor
  const slots = await prisma.slot.findMany({
    where: { instructorId: teacher.id },
    include: {
      course: true,
      lab: true,
      enrollments: {
        include: {
          student: true
        }
      }
    },
  });

  return NextResponse.json(slots);
}
