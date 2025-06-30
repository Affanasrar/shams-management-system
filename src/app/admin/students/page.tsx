"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: "", fatherName: "", phone: "", age: "", school: "", address: ""
  });
  const [editingStudent, setEditingStudent] = useState<any | null>(null);

  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    setStudents(await res.json());
  };

  useEffect(() => { fetchStudents(); }, []);

  const addStudent = async () => {
    await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({ ...newStudent, age: parseInt(newStudent.age) })
    });
    setNewStudent({ name: "", fatherName: "", phone: "", age: "", school: "", address: "" });
    fetchStudents();
  };

  const updateStudent = async () => {
    await fetch("/api/students", {
      method: "PUT",
      body: JSON.stringify({ ...editingStudent, age: parseInt(editingStudent.age) })
    });
    setEditingStudent(null);
    fetchStudents();
  };

  const deleteStudent = async (id: string) => {
    await fetch("/api/students", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchStudents();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Student</DialogTitle></DialogHeader>
            <div className="space-y-2">
              {["name", "fatherName", "phone", "age", "school", "address"].map(field => (
                <Input
                  key={field}
                  placeholder={field}
                  value={newStudent[field as keyof typeof newStudent]}
                  onChange={e => setNewStudent({ ...newStudent, [field]: e.target.value })}
                />
              ))}
              <Button onClick={addStudent}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="border-t">
              <td className="px-4 py-2">{s.name}</td>
              <td className="px-4 py-2 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setEditingStudent({ ...s, age: s.age.toString() })}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
                    <div className="space-y-2">
                      {editingStudent && ["name", "fatherName", "phone", "age", "school", "address"].map(field => (
                        <Input
                          key={field}
                          placeholder={field}
                          value={editingStudent[field]}
                          onChange={e => setEditingStudent({ ...editingStudent, [field]: e.target.value })}
                        />
                      ))}
                      <Button onClick={updateStudent}>Update</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteStudent(s.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
