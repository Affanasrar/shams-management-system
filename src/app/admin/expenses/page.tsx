import { Button } from "@/components/ui/button";

export default async function ExpensesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/expenses`, { cache: "no-store" });
  const expenses = await res.json();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Button>Add Expense</Button>
      </div>
      <table className="w-full table-auto border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e: any) => (
            <tr key={e.id} className="border-t">
              <td className="px-4 py-2">{e.description}</td>
              <td className="px-4 py-2">PKR {e.amount}</td>
              <td className="px-4 py-2">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
