"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teacher-portal/TeacherSkeleton";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";
import { teacherReportsPath } from "@/lib/routes/teacher";

const viewOptions = [
  { value: "day", label: "يومي" },
  { value: "week", label: "أسبوعي" },
  { value: "month", label: "شهري" },
];

export default function TeacherSchedulePage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useTeacherPortalData(teacherId);
  const [view, setView] = useState("day");

  const filteredSessions = useMemo(() => {
    const allSessions = data?.sessions || [];
    const now = new Date();

    if (view === "day") {
      return allSessions.filter((item) => {
        const date = new Date(item.startsAt);
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
      });
    }

    if (view === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      return allSessions.filter((item) => {
        const date = new Date(item.startsAt);
        return date >= weekStart && date < weekEnd;
      });
    }

    return allSessions.filter((item) => {
      const date = new Date(item.startsAt);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    });
  }, [data?.sessions, view]);

  if (isLoading) return <TeacherSkeleton rows={6} />;
  if (error || !data) return <p className="text-sm text-red-600">تعذر تحميل جدول الحصص.</p>;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">جدول الحصص</h1>
        <p className="mt-1 text-sm text-slate-600">إدارة الحصص بعرض يومي، أسبوعي، أو شهري.</p>
      </header>

      <TeacherSectionCard title="نمط العرض">
        <div className="flex flex-wrap gap-2">
          {viewOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => setView(option.value)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${view === option.value ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
              {option.label}
            </button>
          ))}
        </div>
      </TeacherSectionCard>

      <TeacherSectionCard title="قائمة الحصص" description={`عدد الحصص في هذا العرض: ${filteredSessions.length}`}>
        {filteredSessions.length === 0 ? (
          <p className="text-sm text-slate-500">لا توجد حصص في النطاق الحالي.</p>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((sessionItem) => (
              <div key={sessionItem.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-900">{sessionItem.studentName}</p>
                  <p className="text-xs text-slate-500">{new Date(sessionItem.startsAt).toLocaleString("ar-EG")}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sessionItem.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {sessionItem.status === "completed" ? "منفذة" : "قادمة"}
                  </span>
                  <a href={sessionItem.lessonLink} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">بدء الحصة</a>
                  <Link href={teacherReportsPath(teacherId)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">إضافة التقرير</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </TeacherSectionCard>
    </section>
  );
}