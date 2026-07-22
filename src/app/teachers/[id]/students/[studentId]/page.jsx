"use client";

import { use } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getStudent } from "@/services/students/student.service";

export default function TeacherStudentPage({ params }) {
  const { id, studentId } = use(params);

  const {
    data: student,
    isLoading,
    error,
  } = useSWR(studentId ? ["student", studentId] : null, () =>
    getStudent(studentId),
  );

  if (isLoading) {
    return <p className="p-6">جاري تحميل بيانات الطالب...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات الطالب</p>
    );
  }

  if (!student) {
    return <p className="p-6">الطالب غير موجود</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Link
        href={`/teachers/${id}/students/${studentId}/profile`}
        className="rounded-2xl bg-blue-600 p-6 text-center text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700"
      >
        <div className="mb-3 text-amber-200"></div>
        <h2 className="text-xl font-bold">الملومات </h2>
        <p className="mt-2 text-sm text-blue-100">عرض   الطالب</p>
      </Link>
      <Link
        href={`/teachers/${id}/students/${studentId}/reports`}
        className="rounded-2xl bg-blue-600 p-6 text-center text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700"
      >
        <div className="mb-3 text-5xl">📊</div>
        <h2 className="text-xl font-bold">تقارير الطالب</h2>
        <p className="mt-2 text-sm text-blue-100">عرض جميع تقارير الطالب</p>
      </Link>

      <Link
        href={`/teachers/${id}/students/${studentId}/schedule`}
        className="rounded-2xl bg-emerald-600 p-6 text-center text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700"
      >
        <div className="mb-3 text-5xl">📅</div>
        <h2 className="text-xl font-bold">جدول الحصص</h2>
        <p className="mt-2 text-sm text-emerald-100">مواعيد الحصص الأسبوعية</p>
      </Link>
    </div>
  );
}
