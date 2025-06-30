import { Button } from "@/components/ui/button";

export default async function TeacherAttendancePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/teacher/slots`, { cache: "no-store" });
  const slots = await res.json();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mark Attendance</h1>
      {slots.map((slot: any) => (
        <div key={slot.id} className="border rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">{slot.course?.title} ({slot.startTime}-{slot.endTime})</h2>
          <table className="w-full table-auto">
            <thead><tr className="bg-gray-100">
              <th className="px-2 py-1 text-left">Student</th>
              <th className="px-2 py-1">Present</th>
              <th className="px-2 py-1">Absent</th>
            </tr></thead>
            <tbody>
              {slot.enrollments.map((enroll: any) => (
                <tr key={enroll.id} className="border-t">
                  <td className="px-2 py-1">{enroll.student?.name}</td>
                  <td className="px-2 py-1 text-center">
                    <Button variant="outline" size="sm">✅</Button>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <Button variant="outline" size="sm">❌</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
