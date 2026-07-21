"use client";

import TeacherUpsertForm from "@/components/teachers/forms/TeacherUpsertForm";

export default function AddTeacherFormPage() {
  return (
    <div dir="rtl" className="p-8">
      <div className="mx-auto max-w-3xl">
        <TeacherUpsertForm
          title="إضافة معلم"
          description="أنشئ معلمًا جديدًا مع بيانات الاتصال وسعر الساعة والعملة الافتراضية."
          submitLabel="حفظ المعلم"
        />
      </div>
    </div>
  );
}
