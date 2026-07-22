"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, PencilLine, Eye, Banknote } from "lucide-react";
import { getTeachers } from "@/services/teachers/teacher.service";

import useSWR from "swr";

import DataTable from "@/components/table/DataTable";
import TeacherHourlyRateDialog from "@/components/teachers/TeacherHourlyRateDialog";
import {
  formatTeacherHourlyRate,
  formatTeacherStudentCount,
} from "@/services/common/formatter";

export default function Page() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const { data: teachers, isLoading, error } = useSWR("/teachers", getTeachers);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  const safeTeachers = Array.isArray(teachers) ? teachers : [];

  if (!safeTeachers.length) {
    return (
      <div dir="rtl" className="p-8 ">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            لا يوجد معلمون حالياً
          </p>
          <p className="mt-2 text-sm text-slate-500">
            أضف أول معلم من زر الإنشاء في الأعلى.
          </p>

          <Link
            href="/admin/teachers/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            إضافة معلم
          </Link>
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "رقم",
      render: (teacher) => teacher.id,
    },
    {
      title: "اسم المعلم",
      render: (teacher) => (
        <div className="text-right">
          <p className="font-semibold text-slate-900">{teacher.name}</p>
          <p className="mt-1 text-xs text-slate-500">
            {teacher.currency || "EGP"}
          </p>
        </div>
      ),
    },
    {
      title: "البريد الإلكتروني",
      render: (teacher) => teacher.email || "-",
    },
    {
      title: "عدد الطلاب",
      render: (teacher) => formatTeacherStudentCount(teacher),
    },

    {
      title: "سعر الساعة",
      render: (teacher) => {
        const hourlyRate = formatTeacherHourlyRate(teacher);

        if (hourlyRate) {
          return (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              <Banknote className="h-4 w-4" />
              {hourlyRate}
            </span>
          );
        }

        return (
          <button
            type="button"
            onClick={() => setSelectedTeacher(teacher)}
            className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            تحديد سعر الساعة
          </button>
        );
      },
    },
    {
      title: "الإجراءات",
      render: (teacher) => (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedTeacher(teacher)}
            className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <PencilLine className="h-4 w-4" />
            تعديل السعر
          </button>

          <Link
            href={`/admin/teachers/${teacher.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <PencilLine className="h-4 w-4" />
            تعديل
          </Link>

          <Link
            href={`/teachers/${teacher.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Eye className="h-4 w-4" />
            عرض
          </Link>
        </div>
      ),
    },
  ];
  console.log(safeTeachers[0]);

  return (
    <div dir="rtl" className="space-y-6 p-8">
      <TeacherHourlyRateDialog
        open={Boolean(selectedTeacher)}
        teacher={selectedTeacher}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTeacher(null);
          }
        }}
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="text-right">
          <p className="text-sm text-slate-500">إدارة المعلمين</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">المعلمون</h1>
          <p className="mt-2 text-sm text-slate-600">
            عرض وإدارة المعلمين وسرعاتهم ومعلوماتهم الأساسية.
          </p>
        </div>

        <Link
          href="/admin/teachers/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          إضافة معلم
        </Link>
      </div>

      <DataTable columns={columns} data={safeTeachers}  />
    </div>
  );
}
