"use client";

import { useState } from "react";
import useSWR from "swr";
import { getStudents } from "@/services/students/student.service";
import DataTable from "@/components/table/DataTable";
import TeacherSelector from "@/components/teachers/teacher-selector/TeacherSelector";
import SubscriptionSelector from "@/components/subscriptions/SubscriptionSelector";

export default function StudentsPage() {
  const [openTeacherStudentId, setOpenTeacherStudentId] =
    useState(null);

  const [openSubscriptionStudentId, setOpenSubscriptionStudentId] =
    useState(null);

  const {
    data: students,
    error,
    isLoading,
  } = useSWR("/students", getStudents);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  if (!Array.isArray(students)) {
    return <p>لا يمكن عرض الطلاب حالياً.</p>;
  }

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
    render: (student) => (
      <TeacherSelector
        student={student}
        isOpen={openTeacherStudentId === student.id}
        onOpenChange={(open) => {
          setOpenTeacherStudentId(open ? student.id : null);
        }}
      />
    ),
  },
  {
    title: "الاشتراك",
    render: (student) => (
      <SubscriptionSelector
        student={student}
        isOpen={openSubscriptionStudentId === student.id}
        onOpenChange={(open) => {
          setOpenSubscriptionStudentId(open ? student.id : null);
        }}
      />
    ),
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