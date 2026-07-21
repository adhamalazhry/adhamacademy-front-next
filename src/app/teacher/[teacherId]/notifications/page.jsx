"use client";

import { use } from "react";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teacher-portal/TeacherSkeleton";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";

export default function TeacherNotificationsPage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useTeacherPortalData(teacherId);

  if (isLoading) return <TeacherSkeleton rows={5} />;
  if (error || !data) return <p className="text-sm text-red-600">تعذر تحميل الإشعارات.</p>;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">الإشعارات</h1>
        <p className="mt-1 text-sm text-slate-600">كل التنبيهات المرتبطة بطلابك وجدولك ورواتبك.</p>
      </header>

      <TeacherSectionCard title="آخر الإشعارات">
        <div className="space-y-3">
          {data.notifications.map((notification) => (
            <article key={notification.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold text-slate-900">{notification.text}</p>
              <p className="mt-1 text-xs text-slate-500">{notification.time}</p>
            </article>
          ))}
        </div>
      </TeacherSectionCard>
    </section>
  );
}