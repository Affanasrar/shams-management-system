import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Students</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">{data.totalStudents}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Income</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">PKR {data.totalIncome}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Expenses</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">PKR {data.totalExpenses}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
