"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import FormSection from "@/components/forms/FormSection";
import FormRenderer from "@/components/forms/FormRenderer";
import FormButton from "@/components/forms/FormButton";
import Button from "@/components/ui/Button";

const currencyOptions = [
  { value: "SAR", label: "SAR" },
  { value: "QAR", label: "QAR" },
  { value: "EGP", label: "EGP" },
  { value: "USD", label: "USD" },
];

const sessionCountOptions = [
  { value: "4", label: "4" },
  { value: "8", label: "8" },
  { value: "12", label: "12" },
  { value: "16", label: "16" },
];

const sessionDurationOptions = [
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "45", label: "45" },
  { value: "60", label: "60" },
  { value: "90", label: "90" },
];

const fields = [
  {
    component: "input",
    inputType: "number",
    name: "subscriptionFee",
    label: "الرسوم الشهرية",
    placeholder: "أدخل الرسوم الشهرية",
    rules: {
      required: "الرسوم الشهرية مطلوبة",
      valueAsNumber: true,
      min: {
        value: 0,
        message: "يجب أن تكون الرسوم أكبر من أو تساوي صفر",
      },
    },
  },
  {
    component: "select",
    name: "currency",
    label: "العملة",
    options: currencyOptions,
    rules: {
      required: "العملة مطلوبة",
      maxLength: {
        value: 10,
        message: "العملة يجب ألا تتجاوز 10 أحرف",
      },
    },
  },
  {
    component: "select",
    name: "monthlySessions",
    label: "عدد الحصص الشهرية",
    options: sessionCountOptions,
    rules: {
      required: "عدد الحصص الشهرية مطلوب",
      setValueAs: (value) => Number(value),
      min: {
        value: 1,
        message: "عدد الحصص يجب أن يكون 1 على الأقل",
      },
      validate: {
        isInteger: (value) =>
          Number.isInteger(Number(value)) ||
          "عدد الحصص يجب أن يكون رقمًا صحيحًا",
      },
    },
  },
  {
    component: "select",
    name: "sessionDuration",
    label: "مدة الحصة بالدقائق",
    options: sessionDurationOptions,
    rules: {
      required: "مدة الحصة مطلوبة",
      setValueAs: (value) => Number(value),
      min: {
        value: 1,
        message: "مدة الحصة يجب أن تكون 1 على الأقل",
      },
      validate: {
        isInteger: (value) =>
          Number.isInteger(Number(value)) ||
          "مدة الحصة يجب أن تكون رقمًا صحيحًا",
      },
    },
  },
];

export default function SubscriptionForm({
  title,
  initialValues,
  isSaving,
  submitError,
  onSubmit,
  onBack,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-700 transition hover:bg-slate-100"
          aria-label="العودة إلى الإجراءات"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h3 className="text-base font-semibold text-slate-900">{title}</h3>

        <div className="h-10 w-10" />
      </div>

      <FormSection className="border-0 p-0 shadow-none">
        <div className="space-y-4">
          {fields.map((field) => (
            <FormRenderer
              key={field.name}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </div>
      </FormSection>

      {submitError ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {submitError}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          رجوع
        </Button>

        <FormButton loading={isSaving} loadingText="جاري الحفظ...">
          حفظ
        </FormButton>
      </div>
    </form>
  );
}
