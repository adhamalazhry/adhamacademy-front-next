"use client";

import Link from "next/link";
import { use } from "react";
import useSWR from "swr";
import {  getTeacherStudents } from "@/services/teachers/teacher-student.service";

export default function TeacherStudentsPage({ params }) {
  const { id } = use(params);

  const {
    data: students,
    isLoading,
    error,
  } = useSWR(id ? ["teacher-students", id] : null, () =>
    getTeacherStudents(id)
  );

  if (isLoading) return <p>جاري تحميل الطلاب...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل الطلاب</p>;
console.log(students)
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        طلابي
      </h1>

      <div className="grid gap-4">
        {students.map((student) => (
          <Link
            key={student.id}
            href={`/teachers/${id}/students/${student.id}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {student.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  اضغط لعرض صفحة الطالب
                </p>
              </div>

              <span className="text-2xl">👤</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}