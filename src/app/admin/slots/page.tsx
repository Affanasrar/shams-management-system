"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SlotsPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);

  const [newSlot, setNewSlot] = useState({
    courseId: "", labId: "", instructorId: "", startTime: "", endTime: "", capacity: ""
  });

  const [editingSlot, setEditingSlot] = useState<any | null>(null);

  const fetchAll = async () => {
    const [slotsRes, coursesRes, labsRes, instructorsRes] = await Promise.all([
      fetch("/api/slots"), fetch("/api/courses"),
      fetch("/api/labs"), fetch("/api/instructors")
    ]);
    setSlots(await slotsRes.json());
    setCourses(await coursesRes.json());
    setLabs(await labsRes.json());
    setInstructors(await instructorsRes.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const addSlot = async () => {
    await fetch("/api/slots", {
      method: "POST",
      body: JSON.stringify({
        ...newSlot,
        startTime: new Date(newSlot.startTime).toISOString(),
        endTime: new Date(newSlot.endTime).toISOString(),
        capacity: parseInt(newSlot.capacity)
      })
    });
    setNewSlot({ courseId: "", labId: "", instructorId: "", startTime: "", endTime: "", capacity: "" });
    fetchAll();
  };

  const updateSlot = async () => {
    await fetch("/api/slots", {
      method: "PUT",
      body: JSON.stringify({
        ...editingSlot,
        startTime: new Date(editingSlot.startTime).toISOString(),
        endTime: new Date(editingSlot.endTime).toISOString(),
        capacity: parseInt(editingSlot.capacity)
      })
    });
    setEditingSlot(null);
    fetchAll();
  };

  const deleteSlot = async (id: string) => {
    await fetch("/api/slots", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchAll();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Slots</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Slot</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Slot</DialogTitle></DialogHeader>
            <div className="space-y-2">
              <select value={newSlot.courseId} onChange={e => setNewSlot({ ...newSlot, courseId: e.target.value })} className="w-full border rounded p-2">
                <option value="">Select Course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <select value={newSlot.labId} onChange={e => setNewSlot({ ...newSlot, labId: e.target.value })} className="w-full border rounded p-2">
                <option value="">Select Lab</option>
                {labs.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <select value={newSlot.instructorId} onChange={e => setNewSlot({ ...newSlot, instructorId: e.target.value })} className="w-full border rounded p-2">
                <option value="">Select Instructor</option>
                {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
              <Input type="datetime-local" placeholder="Start Time" value={newSlot.startTime} onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value })} />
              <Input type="datetime-local" placeholder="End Time" value={newSlot.endTime} onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })} />
              <Input placeholder="Capacity" value={newSlot.capacity} onChange={e => setNewSlot({ ...newSlot, capacity: e.target.value })} />
              <Button onClick={addSlot}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Course</th>
            <th className="px-4 py-2">Lab</th>
            <th className="px-4 py-2">Instructor</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map(s => (
            <tr key={s.id} className="border-t">
              <td className="px-4 py-2">{s.course?.title}</td>
              <td className="px-4 py-2">{s.lab?.name}</td>
              <td className="px-4 py-2">{s.instructor?.name}</td>
              <td className="px-4 py-2">{new Date(s.startTime).toLocaleString()} - {new Date(s.endTime).toLocaleString()}</td>
              <td className="px-4 py-2 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setEditingSlot({
                      ...s,
                      startTime: new Date(s.startTime).toISOString().slice(0, 16),
                      endTime: new Date(s.endTime).toISOString().slice(0, 16),
                      capacity: s.capacity.toString()
                    })}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Edit Slot</DialogTitle></DialogHeader>
                    <div className="space-y-2">
                      {editingSlot && <>
                        <select value={editingSlot.courseId} onChange={e => setEditingSlot({ ...editingSlot, courseId: e.target.value })} className="w-full border rounded p-2">
                          <option value="">Select Course</option>
                          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                        <select value={editingSlot.labId} onChange={e => setEditingSlot({ ...editingSlot, labId: e.target.value })} className="w-full border rounded p-2">
                          <option value="">Select Lab</option>
                          {labs.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                        <select value={editingSlot.instructorId} onChange={e => setEditingSlot({ ...editingSlot, instructorId: e.target.value })} className="w-full border rounded p-2">
                          <option value="">Select Instructor</option>
                          {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                        </select>
                        <Input type="datetime-local" placeholder="Start Time" value={editingSlot.startTime} onChange={e => setEditingSlot({ ...editingSlot, startTime: e.target.value })} />
                        <Input type="datetime-local" placeholder="End Time" value={editingSlot.endTime} onChange={e => setEditingSlot({ ...editingSlot, endTime: e.target.value })} />
                        <Input placeholder="Capacity" value={editingSlot.capacity} onChange={e => setEditingSlot({ ...editingSlot, capacity: e.target.value })} />
                        <Button onClick={updateSlot}>Update</Button>
                      </>}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteSlot(s.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
