"use client";

import { use } from "react";
import useSWR from "swr";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import { getTeacherStudent } from "@/services/students/student.service";

export default function TeacherStudentRevisionPage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading, error } = useSWR(
    teacherId && studentId ? ["teacher-student-revision", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  if (isLoading) return <p className="p-6 text-slate-600">جاري تحميل صفحة المراجعة...</p>;
  if (error) return <p className="p-6 text-red-600">تعذر تحميل صفحة المراجعة.</p>;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">الحفظ والمراجعة</h1>
        <p className="mt-1 text-sm text-slate-600">متابعة تقدم الطالب في الحفظ الجديد وخطة المراجعة.</p>
      </header>

      <TeacherSectionCard title="حالة الطالب الحالية">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard label="الطالب" value={student?.name || "-"} />
          <InfoCard label="المستوى" value={student?.level || "-"} />
          <InfoCard label="الحالة" value={student?.status || "نشط"} />
        </div>
      </TeacherSectionCard>
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}