"use client";

import { use } from "react";
import NextLessonOverview from "@/components/reports/NextLessonOverview";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teachers/teacher-portal/TeacherSkeleton";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";

export default function TeacherHomeworkPage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useTeacherPortalData(teacherId);

  if (isLoading) return <TeacherSkeleton rows={5} />;
  if (error || !data) return <p className="text-sm text-red-600">تعذر تحميل الواجبات.</p>;

  const homeworkByStudent = data.students.map((student) => {
    const latestReport = (data.reports || [])
      .filter((report) => String(report.studentId) === String(student.id))
      .sort((a, b) => new Date(b.lessonDate || 0) - new Date(a.lessonDate || 0))[0] || null;

    return {
      student,
      latestReport,
    };
  });

  return (
    <section className="space-y-5" dir="rtl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الواجبات</h1>
          <p className="mt-1 text-sm text-slate-600">عرض الواجبات المطلوبة لكل طالب كما وردت في آخر تقرير محفوظ له.</p>
        </div>
      </header>

      <TeacherSectionCard title="واجبات الحصة القادمة" description={`إجمالي الطلاب: ${homeworkByStudent.length}`}>
        {homeworkByStudent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-right text-sm text-slate-500">
            لا يوجد طلاب مرتبطون بهذا المعلم حتى الآن.
          </div>
        ) : (
          <div className="space-y-4">
            {homeworkByStudent.map((item) => (
              <NextLessonOverview
                key={item.student.id}
                report={item.latestReport}
                studentName={item.student.name}
                showStudentName
              />
            ))}
          </div>
        )}
      </TeacherSectionCard>
    </section>
  );
}