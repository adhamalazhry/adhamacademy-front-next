"use client";

import { use } from "react";
import useSWR from "swr";

import { getStudent } from "@/services/student.service";

export default function StudentPage({ params }) {
  const { id } = use(params);

  const {
    data: student,
    error,
    isLoading,
  } = useSWR(
    `/students/${id}`,
    () => getStudent(id)
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        مرحباً {student.name}
      </h1>
    </div>
  );
}