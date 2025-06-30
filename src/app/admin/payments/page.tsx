import { Button } from "@/components/ui/button";

export default async function PaymentsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payments`, { cache: "no-store" });
  const payments = await res.json();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button>Add Payment</Button>
      </div>
      <table className="w-full table-auto border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.student?.name}</td>
              <td className="px-4 py-2">PKR {p.amount}</td>
              <td className="px-4 py-2">{p.date}</td>
              <td className="px-4 py-2">{p.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
