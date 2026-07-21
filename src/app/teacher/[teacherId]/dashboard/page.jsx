"use client";

import Link from "next/link";
import { use } from "react";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";
import TeacherStatCard from "@/components/teacher-portal/TeacherStatCard";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teacher-portal/TeacherSkeleton";
import {
  teacherHomeworkPath,
  teacherFinancialPath,
  teacherReportsPath,
  teacherRevisionPath,
  teacherSchedulePath,
  teacherStudentsPath,
} from "@/lib/routes/teacher";

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function TeacherDashboardPage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useTeacherPortalData(teacherId);

  if (isLoading) {
    return <TeacherSkeleton rows={6} />;
  }

  if (error || !data) {
    return (
      <p className="text-sm text-red-600" dir="rtl">
        تعذر تحميل لوحة المعلم.
      </p>
    );
  }

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const completedSessions = data.sessions.filter(
    (sessionItem) => sessionItem.status === "completed",
  );

  const todaySessions = data.sessions.filter((sessionItem) =>
    isSameDay(new Date(sessionItem.startsAt), now),
  );

  const weekSessions = data.sessions.filter(
    (sessionItem) => new Date(sessionItem.startsAt) >= weekStart,
  );

  const monthSessions = data.sessions.filter(
    (sessionItem) => new Date(sessionItem.startsAt) >= monthStart,
  );

  const monthHours = monthSessions.reduce(
    (sum, sessionItem) => sum + Number(sessionItem.durationMinutes || 0) / 60,
    0,
  );

  const completedReports = data.reports.filter(
    (report) => report.generalNotes || report.studentNotes || report.parentNotes,
  );

  const latestActivity =
    data.reports[0]?.lessonDate || data.sessions[data.sessions.length - 1]?.startsAt || "-";

  const upcomingSessions = data.sessions
    .filter((sessionItem) => new Date(sessionItem.startsAt) > new Date())
    .slice(0, 5);

  return (
    <section className="space-y-6" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">لوحة المعلم</h1>
        <p className="mt-1 text-sm text-slate-600">
          نظرة شاملة على الأداء، الحصص، والتقارير اليومية.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TeacherStatCard title="عدد الطلاب" value={data.students.length} subtitle="طلاب نشطون" />
        <TeacherStatCard title="حصص اليوم" value={todaySessions.length} subtitle="مواعيد اليوم" />
        <TeacherStatCard title="حصص هذا الأسبوع" value={weekSessions.length} subtitle="من الأحد حتى اليوم" />
        <TeacherStatCard title="حصص هذا الشهر" value={monthSessions.length} subtitle="الجدول الشهري" />
        <TeacherStatCard title="ساعات هذا الشهر" value={monthHours.toFixed(1)} subtitle="إجمالي ساعات التدريس" />
        <TeacherStatCard title="تقارير مكتملة" value={completedReports.length} subtitle="تم توثيقها" />
        <TeacherStatCard title="آخر نشاط" value={String(latestActivity).slice(0, 10)} subtitle="آخر تحديث" />
        <TeacherStatCard title="حصص منفذة" value={completedSessions.length} subtitle="حصة" />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <TeacherSectionCard title="حصص اليوم" description="جدول الحصص اليومية والبدء السريع">
          {todaySessions.length === 0 ? (
            <p className="text-sm text-slate-500">لا توجد حصص اليوم.</p>
          ) : (
            <div className="space-y-3">
              {todaySessions.map((sessionItem) => (
                <div key={sessionItem.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-semibold text-slate-900">{sessionItem.studentName}</p>
                    <p className="text-xs text-slate-500">{new Date(sessionItem.startsAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={sessionItem.lessonLink} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">بدء الحصة</a>
                    <Link href={teacherReportsPath(teacherId)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">إضافة تقرير</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TeacherSectionCard>

        <TeacherSectionCard title="أقرب الحصص القادمة" description="المواعيد التالية خلال الأيام القادمة">
          {upcomingSessions.length === 0 ? (
            <p className="text-sm text-slate-500">لا توجد حصص قادمة.</p>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((sessionItem) => (
                <div key={sessionItem.id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-semibold text-slate-900">{sessionItem.studentName}</p>
                  <p className="mt-1 text-xs text-slate-500">{new Date(sessionItem.startsAt).toLocaleString("ar-EG")}</p>
                </div>
              ))}
            </div>
          )}
        </TeacherSectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <TeacherSectionCard title="روابط سريعة" description="انتقال مباشر إلى أهم أقسام بوابة المعلم">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={teacherStudentsPath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">طلابي</Link>
            <Link href={teacherSchedulePath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">جدول الحصص</Link>
            <Link href={teacherRevisionPath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">الحفظ والمراجعة</Link>
            <Link href={teacherHomeworkPath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">الواجبات</Link>
            <Link href={teacherFinancialPath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">المالية</Link>
            <Link href={teacherReportsPath(teacherId)} className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">التقارير</Link>
          </div>
        </TeacherSectionCard>

        <TeacherSectionCard title="الإشعارات" description="آخر التنبيهات المتعلقة بالطلاب والراتب">
          {data.notifications.map((notification) => (
            <div key={notification.id} className="mb-3 rounded-xl border border-slate-200 p-3 last:mb-0">
              <p className="text-sm font-semibold text-slate-900">{notification.text}</p>
              <p className="mt-1 text-xs text-slate-500">{notification.time}</p>
            </div>
          ))}
        </TeacherSectionCard>
      </div>
    </section>
  );
}