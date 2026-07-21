"use client";

import { useForm } from "react-hook-form";
import FormRenderer from "@/components/forms/FormRenderer";
import FormSection from "@/components/forms/FormSection";
import FormButton from "@/components/forms/FormButton";
import TeacherSectionCard from "@/components/teacher-portal/TeacherSectionCard";

const profileFields = [
  { component: "input", inputType: "text", name: "name", label: "الاسم", rules: { required: "الاسم مطلوب" } },
  { component: "input", inputType: "email", name: "email", label: "البريد الإلكتروني", rules: { required: "البريد مطلوب" } },
  { component: "input", inputType: "text", name: "phone", label: "الهاتف" },
  { component: "input", inputType: "text", name: "country", label: "الدولة" },
  { component: "input", inputType: "text", name: "timezone", label: "المنطقة الزمنية" },
  { component: "input", inputType: "text", name: "qualifications", label: "المؤهلات" },
  { component: "input", inputType: "text", name: "experienceYears", label: "سنوات الخبرة" },
];

export default function TeacherAccountPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "المعلم",
      email: "teacher@example.com",
      phone: "+966500000000",
      country: "السعودية",
      timezone: "Asia/Riyadh",
      qualifications: "إجازة في القرآن الكريم",
      experienceYears: "7",
    },
  });

  function onSubmit(values) {
    console.log("teacher profile update", values);
  }

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">حسابي</h1>
        <p className="mt-1 text-sm text-slate-600">إدارة البيانات الشخصية، إعدادات الإشعارات، وأوقات العمل.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormSection title="البيانات الأساسية" description="تحديث المعلومات الشخصية للمعلم.">
          <div className="grid gap-4 md:grid-cols-2">
            {profileFields.map((field) => (
              <FormRenderer key={field.name} field={field} register={register} errors={errors} />
            ))}
          </div>
        </FormSection>

        <TeacherSectionCard title="إعدادات إضافية" description="إدارة كلمة المرور والتنبيهات والإجازات.">
          <div className="grid gap-3 md:grid-cols-2">
            <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">تغيير كلمة المرور</button>
            <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">إعدادات الإشعارات</button>
            <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">أوقات العمل</button>
            <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">الإجازات</button>
          </div>
        </TeacherSectionCard>

        <FormButton loading={isSubmitting}>حفظ التعديلات</FormButton>
      </form>
    </section>
  );
}