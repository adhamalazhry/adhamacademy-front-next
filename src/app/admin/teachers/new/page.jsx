"use client";

import TeacherUpsertForm from "@/components/teachers/forms/TeacherUpsertForm";

export default function AddTeacherPage() {
  return (
    <div dir="rtl" className="p-8">
      <div className="mx-auto max-w-3xl">
        <TeacherUpsertForm
          title="إضافة معلم جديد"
          description="أدخل بيانات المعلم الجديدة مع سعر الساعة والعملة."
          submitLabel="حفظ المعلم"
        />
      </div>
    </div>
  );
}
