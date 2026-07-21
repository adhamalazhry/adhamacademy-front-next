"use client";

import Link from "next/link";
import useSWR from "swr";

import {
  formatTeacherHourlyRate,
  formatTeacherStudentCount,
  getTeacherStudentCount,
  getTeachers,
} from "@/services/teacher.service";

export default function TeachersPage() {
  const { data: teachers, error, isLoading } = useSWR("/teachers", getTeachers);

  const safeTeachers = Array.isArray(teachers) ? teachers : [];

  if (isLoading) return <p className="p-6 text-gray-500">جار التحميل...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading data</p>;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">المعلمون</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">قائمة المعلمين</h1>
          <p className="mt-2 text-sm text-slate-600">
            استعرض المعلمين وأسعارهم وأعداد الطلاب المرتبطين بهم.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {safeTeachers.map((teacher) => {
            const hourlyRate = formatTeacherHourlyRate(
              teacher.hourlyRate,
              teacher.currency,
            );

            return (
              <Link
                key={teacher.id}
                href={`/teachers/${teacher.id}`}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-right">
                    <h2 className="text-lg font-semibold text-slate-900">{teacher.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {teacher.email || "لا يوجد بريد إلكتروني"}
                    </p>
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    #{teacher.id}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4 text-right">
                    <p className="text-xs text-slate-500">عدد الطلاب</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {formatTeacherStudentCount(teacher)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 text-right">
                    <p className="text-xs text-slate-500">سعر الساعة</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {hourlyRate || "غير محدد"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}