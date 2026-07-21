"use client";

import { use } from "react";
import Link from "next/link";
import useSWR from "swr";

import {
  formatTeacherHourlyRate,
  getTeacher,
  formatTeacherStudentCount,
} from "@/services/teacher.service";

export default function TeacherPage({ params }) {
  const { id } = use(params);

  const { data: teacher, error, isLoading } = useSWR(
    `/teachers/${id}`,
    ()=>getTeacher(id)
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div dir="rtl" className="space-y-6 bg-slate-50 p-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">ملخص المعلم</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          مرحباً {teacher?.name}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {teacher?.email || "لا يوجد بريد إلكتروني"}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard label="رقم المعلم" value={teacher?.id || "-"} />
        <InfoCard
          label="عدد الطلاب"
          value={formatTeacherStudentCount(teacher)}
        />
        <InfoCard
          label="سعر الساعة"
          value={formatTeacherHourlyRate(teacher?.hourlyRate, teacher?.currency) || "غير محدد"}
        />
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/teachers/${id}/profile`}
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          عرض الملف الشخصي
        </Link>

        <Link
          href={`/teachers/${id}/students`}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          عرض الطلاب
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-right shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}