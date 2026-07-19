"use client";

import useSWR from "swr";
import { getTeachers } from "@/services/teacher.service";

export default function Page() {
  const {
    data: teachers,
    error,
    isLoading,
  } = useSWR("/teachers", getTeachers);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div className="bg-amber-300 p-6">
      <h1 className="mb-4 text-2xl font-bold">
        All Teachers
      </h1>

      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="mb-2 rounded bg-white p-3 text-black "
        >
          {teacher.name}
        </div>
      ))}
    </div>
  );
}