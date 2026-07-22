"use client";

import MetricCard from "@/components/dashboard/MetricCard";
import useSWR from "swr";
import { getStudent } from "@/services/students/student.service";
import { getClientSession } from "@/lib/auth/session-client";

export default function StudentDashboardPage() {
  const session = getClientSession();
  const studentId = session.userId || "1";

  const {
    data: student,
    isLoading,
    error,
  } = useSWR(`/students/${studentId}`, () => getStudent(studentId));

  if (isLoading) {
    return <p className="text-sm text-slate-500">جاري تحميل لوحة الطالب...</p>;
  }

  if (error || !student) {
    return <p className="text-sm text-red-600">تعذر تحميل بيانات الطالب.</p>;
  }

  return (
    <section className="space-y-6" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">مرحبًا {student.name}</h1>
        <p className="mt-1 text-sm text-slate-600">هذه لوحة الطالب الشخصية لعرض التقدم والمهام القادمة.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="المعلم" value={student.teacher?.name || "غير معيّن"} accent="blue" />
        <MetricCard label="الاشتراك الحالي" value={student.subscriptionFee ? `${student.subscriptionFee} ${student.currency || ""}` : "لا يوجد"} accent="emerald" />
        <MetricCard label="الحصص الشهرية" value={student.monthlySessions || "-"} accent="amber" />
        <MetricCard label="مدة الحصة" value={student.sessionDuration ? `${student.sessionDuration} دقيقة` : "-"} accent="violet" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">الموعد القادم</h2>
          <p className="mt-2 text-sm text-slate-600">الخميس - 07:00 مساءً</p>
          <a href="#" className="mt-3 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">رابط الحصة</a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">مؤشرات التعلم</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>نسبة الإنجاز: 82%</li>
            <li>الحفظ الجديد: 3 مقاطع</li>
            <li>المراجعة المطلوبة: مقطعان</li>
            <li>آخر تقييم: جيد جدًا</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
