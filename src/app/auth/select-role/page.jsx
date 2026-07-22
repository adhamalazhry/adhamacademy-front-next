"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roleOptions = [
  {
    role: "admin",
    title: "الدخول كمشرف",
    description: "وصول كامل لإدارة الطلاب والمعلمين والاشتراكات.",
    userId: "1",
    target: "/admin/dashboard",
  },
  {
    role: "teacher",
    title: "الدخول كمعلم",
    description: "لوحة المعلم وطلابه والتقارير والواجبات.",
    userId: "1",
    target: "/teacher/3/dashboard",
  },
  {
    role: "student",
    title: "الدخول كطالب",
    description: "لوحة الطالب الشخصية والجدول والتقارير والواجبات.",
    userId: "1",
    target: "/student/dashboard",
  },
];

export default function SelectRolePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSelect(option) {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: option.role,
          userId: option.userId,
        }),
      });

      router.push(option.target);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          اختيار نمط الدخول
        </h1>

        <p className="mt-3 text-center text-slate-600">
          اختر الدور لعرض التجربة المناسبة. في الإنتاج سيتم تحديد الدور بعد تسجيل الدخول.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {roleOptions.map((option) => (
            <button
              key={option.role}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSelect(option)}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow"
            >
              <h2 className="text-lg font-semibold text-slate-900">{option.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
