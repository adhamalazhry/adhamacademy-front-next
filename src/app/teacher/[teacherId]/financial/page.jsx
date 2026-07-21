"use client";

import { use } from "react";

export default function TeacherFinancialPage({ params }) {
  const { teacherId } = use(params);

  return (
    <section className="space-y-6" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">الرواتب</h1>
        <p className="mt-1 text-sm text-slate-600">
          صفحة إدارة رواتب المعلم.
        </p>
      </header>

      {/* سيتم إضافة نظام الرواتب هنا لاحقًا */}
    </section>
  );
}