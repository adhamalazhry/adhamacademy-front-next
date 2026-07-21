"use client";

import { use } from "react";
import useSWR from "swr";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";
import { getTeacherStudent } from "@/services/student.service";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";

export default function TeacherStudentSchedulePage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading: studentLoading, error: studentError } = useSWR(
    teacherId && studentId ? ["teacher-student-schedule", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const { data, isLoading: scheduleLoading, error: scheduleError } = useTeacherPortalData(teacherId);

  if (studentLoading || scheduleLoading) return <p className="p-6 text-slate-600">جاري تحميل جدول الطالب...</p>;
  if (studentError || scheduleError) return <p className="p-6 text-red-600">تعذر تحميل جدول الطالب.</p>;

  const sessions = (data?.sessions || []).filter(
    (sessionItem) => String(sessionItem.studentId) === String(studentId),
  );

  return (
    <section className="space-y-5 " dir="rtl ">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">جدول الحصص</h1>
        <p className="mt-1 text-sm text-slate-600">مواعيد حصص {student?.name || "الطالب"} القادمة والمنفذة.</p>
      </header>

      <TeacherSectionCard title="قائمة الحصص" description={`الإجمالي: ${sessions.length}`}>
        {sessions.length === 0 ? (
          <p className="text-sm text-slate-500">لا توجد حصص مرتبطة بهذا الطالب.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((sessionItem) => (
              <div key={sessionItem.id} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{new Date(sessionItem.startsAt).toLocaleString("ar-EG")}</p>
                <p className="mt-1 text-sm text-slate-600">الحالة: {sessionItem.status === "completed" ? "منفذة" : "قادمة"}</p>
                <p className="mt-1 text-sm text-slate-600">مدة الحصة: {sessionItem.durationMinutes} دقيقة</p>
              </div>
            ))}
          </div>
        )}
      </TeacherSectionCard>
    </section>
  );
}