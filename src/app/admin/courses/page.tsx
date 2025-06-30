"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: "", type: "COMPUTER", durationMonths: "", feeMonthly: "", feePackage: ""
  });
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    setCourses(await res.json());
  };

  useEffect(() => { fetchCourses(); }, []);

  const addCourse = async () => {
    await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify({
        ...newCourse,
        durationMonths: parseInt(newCourse.durationMonths),
        feeMonthly: parseFloat(newCourse.feeMonthly),
        feePackage: parseFloat(newCourse.feePackage)
      })
    });
    setNewCourse({ title: "", type: "COMPUTER", durationMonths: "", feeMonthly: "", feePackage: "" });
    fetchCourses();
  };

  const updateCourse = async () => {
    await fetch("/api/courses", {
      method: "PUT",
      body: JSON.stringify({
        ...editingCourse,
        durationMonths: parseInt(editingCourse.durationMonths),
        feeMonthly: parseFloat(editingCourse.feeMonthly),
        feePackage: parseFloat(editingCourse.feePackage)
      })
    });
    setEditingCourse(null);
    fetchCourses();
  };

  const deleteCourse = async (id: string) => {
    await fetch("/api/courses", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchCourses();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Course</DialogTitle></DialogHeader>
            <div className="space-y-2">
              <Input placeholder="title" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
              <select value={newCourse.type} onChange={e => setNewCourse({ ...newCourse, type: e.target.value })} className="border rounded p-2 w-full">
                <option value="COMPUTER">COMPUTER</option>
                <option value="ENGLISH">ENGLISH</option>
                <option value="COACHING">COACHING</option>
              </select>
              <Input placeholder="durationMonths" value={newCourse.durationMonths} onChange={e => setNewCourse({ ...newCourse, durationMonths: e.target.value })} />
              <Input placeholder="feeMonthly" value={newCourse.feeMonthly} onChange={e => setNewCourse({ ...newCourse, feeMonthly: e.target.value })} />
              <Input placeholder="feePackage" value={newCourse.feePackage} onChange={e => setNewCourse({ ...newCourse, feePackage: e.target.value })} />
              <Button onClick={addCourse}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.title}</td>
              <td className="px-4 py-2 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setEditingCourse({ ...c, durationMonths: c.durationMonths.toString(), feeMonthly: c.feeMonthly.toString(), feePackage: c.feePackage.toString() })}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Edit Course</DialogTitle></DialogHeader>
                    <div className="space-y-2">
                      {editingCourse && <>
                        <Input placeholder="title" value={editingCourse.title} onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })} />
                        <select value={editingCourse.type} onChange={e => setEditingCourse({ ...editingCourse, type: e.target.value })} className="border rounded p-2 w-full">
                          <option value="COMPUTER">COMPUTER</option>
                          <option value="ENGLISH">ENGLISH</option>
                          <option value="COACHING">COACHING</option>
                        </select>
                        <Input placeholder="durationMonths" value={editingCourse.durationMonths} onChange={e => setEditingCourse({ ...editingCourse, durationMonths: e.target.value })} />
                        <Input placeholder="feeMonthly" value={editingCourse.feeMonthly} onChange={e => setEditingCourse({ ...editingCourse, feeMonthly: e.target.value })} />
                        <Input placeholder="feePackage" value={editingCourse.feePackage} onChange={e => setEditingCourse({ ...editingCourse, feePackage: e.target.value })} />
                        <Button onClick={updateCourse}>Update</Button>
                      </>}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteCourse(c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
