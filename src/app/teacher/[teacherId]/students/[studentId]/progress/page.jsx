"use client";

import { use } from "react";
import useSWR from "swr";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import { getTeacherStudent } from "@/services/students/student.service";
import { getTeacherStudentReports } from "@/services/reprts/report.service";

export default function TeacherStudentProgressPage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading: studentLoading, error: studentError } = useSWR(
    teacherId && studentId ? ["teacher-student-progress", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const { data: reports = [], isLoading: reportsLoading, error: reportsError } = useSWR(
    teacherId && studentId ? ["teacher-student-progress-reports", teacherId, studentId] : null,
    () => getTeacherStudentReports(teacherId, studentId),
  );

  if (studentLoading || reportsLoading) return <p className="p-6 text-slate-600">جاري تحميل صفحة التقدم...</p>;
  if (studentError || reportsError) return <p className="p-6 text-red-600">تعذر تحميل بيانات التقدم.</p>;

  const latestReport = reports[0] || null;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">التقدم والإحصائيات</h1>
        <p className="mt-1 text-sm text-slate-600">ملخص مستوى الطالب اعتمادًا على التقارير المسجلة فعليًا.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard label="إجمالي التقارير" value={reports.length} />
        <InfoCard label="آخر تقرير" value={latestReport?.lessonDate || "لا يوجد"} />
        <InfoCard label="المستوى" value={student?.level || "-"} />
      </div>

      <TeacherSectionCard title="آخر ملخص تعليمي">
        {latestReport ? (
          <div className="space-y-2 text-sm text-slate-700">
            <p>ملاحظات عامة: {latestReport.generalNotes || "-"}</p>
            <p>ملاحظات الطالب: {latestReport.studentNotes || "-"}</p>
            <p>ملاحظات ولي الأمر: {latestReport.parentNotes || "-"}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">لا توجد تقارير كافية لحساب التقدم بعد.</p>
        )}
      </TeacherSectionCard>
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}