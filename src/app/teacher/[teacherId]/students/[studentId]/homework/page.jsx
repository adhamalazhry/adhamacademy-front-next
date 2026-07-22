"use client";

import { use } from "react";
import useSWR from "swr";
import NextLessonOverview from "@/components/reports/NextLessonOverview";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import { getTeacherStudentReports } from "@/services/reprts/report.service";
import { getTeacherStudent } from "@/services/students/student.service";

export default function TeacherStudentHomeworkPage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading, error } = useSWR(
    teacherId && studentId ? ["teacher-student-homework", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const {
    data: reports,
    isLoading: reportsLoading,
    error: reportsError,
  } = useSWR(
    teacherId && studentId ? ["teacher-student-homework-reports", teacherId, studentId] : null,
    () => getTeacherStudentReports(teacherId, studentId),
  );

  if (isLoading || reportsLoading) return <p className="p-6 text-slate-600">جاري تحميل صفحة الواجبات...</p>;
  if (error || reportsError) return <p className="p-6 text-red-600">تعذر تحميل صفحة الواجبات.</p>;

  const latestReport = Array.isArray(reports)
    ? [...reports].sort((a, b) => new Date(b.lessonDate || 0) - new Date(a.lessonDate || 0))[0]
    : null;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">الواجبات</h1>
        <p className="mt-1 text-sm text-slate-600">عرض المطلوب للحصة القادمة فقط بشكل واضح ومنظم.</p>
      </header>

      <TeacherSectionCard
        title={`واجب ${student?.name || "الطالب"}`}
        description="هذا العرض يعتمد على آخر تقرير حصة محفوظ ويظهر فقط ما هو مطلوب للحصة التالية."
      >
        <NextLessonOverview report={latestReport} studentName={student?.name} compact />
      </TeacherSectionCard>
    </section>
  );
}