"use client";

import { use } from "react";
import Link from "next/link";
import useSWR from "swr";

import TeacherUpsertForm from "@/components/teachers/forms/TeacherUpsertForm";
import { getTeacher } from "@/services/teacher.service";

export default function AdminTeacherEditPage({ params }) {
  const { id } = use(params);

  const {
    data: teacher,
    error,
    isLoading,
  } = useSWR(`/teachers/${id}`, () => getTeacher(id));

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div dir="rtl" className="space-y-6 p-8">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="text-right">
          <p className="text-sm text-slate-500">تعديل معلم</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{teacher?.name}</h1>
          <p className="mt-2 text-sm text-slate-600">تحديث بيانات المعلم الأساسية وسعر الساعة والعملة.</p>
        </div>

        <Link
          href="/admin/teachers"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          العودة إلى القائمة
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <TeacherUpsertForm
          teacher={teacher}
          title="تعديل بيانات المعلم"
          description="قم بتحديث الاسم والبريد وسعر الساعة والعملة."
          submitLabel="حفظ التعديلات"
          successMessage="تم تحديث بيانات المعلم بنجاح"
        />
      </div>
    </div>
  );
}