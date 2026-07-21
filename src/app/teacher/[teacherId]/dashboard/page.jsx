"use client";

import { use } from "react";

export default function TeacherDashboardPage({ params }) {
  const { teacherId } = use(params);

  return (
    <section className="space-y-8" dir="rtl">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          لوحة تحكم المعلم
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          مرحبًا بك في بوابة المعلم. من هنا ستتمكن من متابعة الطلاب،
          وإدارة الحصص، وإرسال التقارير، ومراجعة الواجبات،
          ومتابعة الإحصائيات والمالية الخاصة بك.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardPlaceholder title="إحصائيات المعلم" />
        <DashboardPlaceholder title="حصص اليوم" />
        <DashboardPlaceholder title="آخر التقارير" />
        <DashboardPlaceholder title="الإشعارات" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardPlaceholder
          title="النشاط الأخير"
          height="h-72"
        />

        <DashboardPlaceholder
          title="روابط سريعة"
          height="h-72"
        />
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-800">
          جاري تطوير لوحة التحكم
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          سيتم إضافة الإحصائيات، الحصص، التقارير، الإشعارات،
          التحليلات، والرسوم البيانية في هذه الصفحة لاحقًا بعد
          اكتمال ربط جميع خدمات النظام بالـ Backend.
        </p>
      </div>
    </section>
  );
}

function DashboardPlaceholder({
  title,
  height = "h-44",
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${height}`}
    >
      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <div className="mt-6 flex h-full items-center justify-center">
        <span className="text-sm text-slate-400">
          سيتم إضافة هذا القسم لاحقًا
        </span>
      </div>
    </div>
  );
}