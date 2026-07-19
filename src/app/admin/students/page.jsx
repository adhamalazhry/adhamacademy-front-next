"use client";

import useSWR from "swr";
import { getStudents } from "@/services/student.service";
import Link from "next/link";
import DataTable from "@/components/table/DataTable"

export default function StudentsPage() {
  const {
    data: students,
    error,
    isLoading,
  } = useSWR("/students", getStudents);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  const columns = [
  {
    title: "الرقم",
    render: (student) => student.id,
  },
  {
    title: "الطالب",
    render: (student) => student.name,
  },
  {
    title: "المعلم",
    render: (student) =>
      student.teacher?.name || "لا يوجد معلم",
  },
  
];

  return (
   <div className="p-8" dir="rtl">
  <DataTable
  columns={columns}
  data={students}
/>
</div>
  );
}