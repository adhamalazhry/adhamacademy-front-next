"use client";

import useSWR from "swr";
import NextLessonOverview from "@/components/reports/NextLessonOverview";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";
import { getStudentReports } from "@/services/report.service";
import { getStudent } from "@/services/student.service";

export default function StudentHomeworkWorkspace({ studentId }) {
  const {
    data: student,
    isLoading: studentLoading,
    error: studentError,
  } = useSWR(studentId ? ["student-homework-profile", studentId] : null, () =>
    getStudent(studentId),
  );

  const {
    data: reports,
    isLoading: reportsLoading,
    error: reportsError,
  } = useSWR(studentId ? ["student-homework-reports", studentId] : null, () =>
    getStudentReports(studentId),
  );

  if (studentLoading || reportsLoading) {
    return <p className="text-sm text-slate-500">جاري تحميل الواجبات...</p>;
  }

  if (studentError || reportsError) {
    return <p className="text-sm text-red-600">تعذر تحميل واجبات الطالب.</p>;
  }

  const latestReport = Array.isArray(reports)
    ? [...reports].sort((a, b) => new Date(b.lessonDate || 0) - new Date(a.lessonDate || 0))[0]
    : null;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">واجبات الحصة القادمة</h1>
        <p className="mt-1 text-sm text-slate-600">ستجد هنا فقط المطلوب منك قبل الحصة التالية اعتمادًا على آخر تقرير محفوظ.</p>
      </header>

      <TeacherSectionCard
        title={`واجب ${student?.name || "الطالب"}`}
        description="يعتمد هذا العرض على آخر تقرير تعليمي محفوظ لحسابك."
      >
        <NextLessonOverview report={latestReport} compact />
      </TeacherSectionCard>
    </section>
  );
}
