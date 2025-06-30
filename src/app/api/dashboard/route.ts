import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalStudents = await prisma.student.count();
  const totalIncome = await prisma.payment.aggregate({ _sum: { amount: true } });
  const totalExpenses = await prisma.expense.aggregate({ _sum: { amount: true } });

  return NextResponse.json({
    totalStudents,
    totalIncome: totalIncome._sum.amount ?? 0,
    totalExpenses: totalExpenses._sum.amount ?? 0
  });
}
