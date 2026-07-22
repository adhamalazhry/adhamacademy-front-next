"use client";

import { use } from "react";
import useSWR from "swr";
import {
  formatTeacherHourlyRate,
  formatTeacherStudentCount,
} from "@/services/common/formatter";

export default function TeacherProfilePage({ params }) {
  const { id } = use(params);

  const {
    data: teacher,
    error,
    isLoading,
  } = useSWR(["teacher", id], () => getTeacher(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const hourlyRate = formatTeacherHourlyRate(
    teacher?.hourlyRate,
    teacher?.currency,
  );

  return (
    <div dir="rtl" className="space-y-6 p-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-right">
            <p className="text-sm text-slate-500">الملف الشخصي للمعلم</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{teacher?.name}</h1>
            <p className="mt-2 text-slate-600">
              {teacher?.email || "لا يوجد بريد إلكتروني"}
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-3">
            <InfoCard label="رقم المعلم" value={teacher?.id || "-"} />
            <InfoCard
              label="عدد الطلاب"
              value={formatTeacherStudentCount(teacher)}
            />
            <InfoCard label="سعر الساعة" value={hourlyRate || "غير محدد"} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">معلومات إضافية</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoRow label="البريد الإلكتروني" value={teacher?.email || "-"} icon="✉️" />
          <InfoRow label="العملة" value={teacher?.currency || "EGP"} icon="💱" />
          <InfoRow label="سعر الساعة" value={hourlyRate || "غير محدد"} icon="💰" />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4 text-right">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-700">{value || "-"}</p>
          <p className="mt-2 text-sm text-slate-500">{label}</p>
        </div>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
}
