import Link from "next/link";
import MetricCard from "@/components/dashboard/MetricCard";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">لوحة المشرف</h1>
        <p className="mt-1 text-sm text-slate-600">نظرة عامة على مؤشرات النظام وإجراءات الإدارة اليومية.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="إجمالي الطلاب" value="128" hint="+12 هذا الشهر" accent="blue" />
        <MetricCard label="إجمالي المعلمين" value="24" hint="طاقم نشط" accent="emerald" />
        <MetricCard label="اشتراكات فعالة" value="116" hint="90% معدل التفعيل" accent="violet" />
        <MetricCard label="مدفوعات متأخرة" value="7" hint="تحتاج متابعة" accent="rose" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">إجراءات سريعة</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/students/new" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">إضافة طالب جديد</Link>
          <Link href="/admin/teachers/new" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">إضافة معلم جديد</Link>
          <Link href="/admin/subscriptions" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">إدارة الاشتراكات</Link>
          <Link href="/admin/payments" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">مراجعة المدفوعات</Link>
          <Link href="/admin/schedules" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">إدارة الجداول</Link>
          <Link href="/admin/reports" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">مركز التقارير</Link>
        </div>
      </div>
    </section>
  );
}
