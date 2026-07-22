"use client";

import Link from "next/link";
import useSWR from "swr";
import {
  Mail,
  Users,
  BadgeDollarSign,
  GraduationCap,
  Plus,
} from "lucide-react";

import {
  formatTeacherHourlyRate,
  formatTeacherStudentCount,
} from "@/services/common/formatter";

export default function TeachersPage() {
  const { data: teachers, error, isLoading } = useSWR(
    "/teachers",
    getTeachers
  );

  const safeTeachers = Array.isArray(teachers) ? teachers : [];

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">جار التحميل...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>
      </div>
    );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <div className="mb-8 rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-sm font-medium text-blue-600">
                لوحة التحكم
              </span>

              <h1 className="mt-2 text-4xl font-black text-slate-900">
                المعلمون
              </h1>

              <p className="mt-3 max-w-xl text-slate-500">
                إدارة جميع المعلمين ومتابعة الطلاب وسعر الساعة الخاصة بكل معلم.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="rounded-3xl bg-blue-50 px-6 py-4 text-center">
                <p className="text-xs text-slate-500">
                  إجمالي المعلمين
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-700">
                  {safeTeachers.length}
                </p>
              </div>

              <Link
                href="/teachers/new"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                إضافة معلم
              </Link>
            </div>
          </div>
        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {safeTeachers.map((teacher) => {
            const hourlyRate = formatTeacherHourlyRate(
              teacher.hourlyRate,
              teacher.currency
            );

            return (
              <Link
                key={teacher.id}
                href={`/teachers/${teacher.id}`}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
                {/* Top */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
                      {teacher.name?.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-700">
                        {teacher.name}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Mail size={14} />
                        {teacher.email || "لا يوجد بريد"}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    #{teacher.id}
                  </span>
                </div>

                <div className="my-6 h-px bg-slate-200" />

                {/* Stats */}

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                        <Users size={18} />
                      </div>

                      <span className="text-sm text-slate-600">
                        عدد الطلاب
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {formatTeacherStudentCount(teacher)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                        <BadgeDollarSign size={18} />
                      </div>

                      <span className="text-sm text-slate-600">
                        سعر الساعة
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {hourlyRate || "غير محدد"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center rounded-2xl bg-blue-600 py-3 font-semibold text-white transition group-hover:bg-blue-700">
                  <GraduationCap className="ml-2" size={18} />
                  عرض الملف الشخصي
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}