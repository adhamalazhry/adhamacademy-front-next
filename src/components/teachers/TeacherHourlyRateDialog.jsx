"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { X } from "lucide-react";

import Button from "@/components/ui/Button";
import FormButton from "@/components/forms/FormButton";
import Toast from "@/components/ui/Toast";
import TeacherFormFields from "./forms/TeacherFormFields";
import { updateTeacher } from "@/services/teacher.service";

function buildDefaultValues(teacher) {
  return {
    hourlyRate: teacher?.hourlyRate ?? 0,
    currency: "",
  };
}

export default function TeacherHourlyRateDialog({
  open,
  teacher,
  onOpenChange,
  onSaved,
}) {
  const { mutate } = useSWRConfig();
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: buildDefaultValues(teacher),
  });

  useEffect(() => {
    if (open) {
      reset(buildDefaultValues(teacher));
    }
  }, [open, teacher, reset]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => {
      setToastMessage("");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  if (!open || !teacher) {
    return null;
  }

  async function onSubmit(values) {
    const payload = {
      hourlyRate: values.hourlyRate === "" ? 0 : Number(values.hourlyRate) || 0,
    };

    const currency = String(values.currency || "").trim().toUpperCase();

    if (currency) {
      payload.currency = currency;
    }

    const updatedTeacher = await updateTeacher(teacher.id, payload);

    await mutate("/teachers");
    await mutate(`/teachers/${teacher.id}`);

    setToastMessage("تم تحديث سعر الساعة بنجاح");

    if (typeof onSaved === "function") {
      onSaved(updatedTeacher);
    }

    onOpenChange(false);
  }


  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <Toast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <div
        className="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl shadow-slate-900/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">تعديل سريع</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              تحديد سعر الساعة
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {teacher.name}
            </p>
          </div>

          <button
            type="button"
            aria-label="إغلاق النافذة"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TeacherFormFields
            mode="rate"
            register={register}
            errors={errors}
            sectionTitle="سعر الساعة"
            sectionDescription="يمكنك تعديل السعر والعملة مباشرة دون مغادرة الصفحة."
            currencyDefaultValue=""
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              إلغاء
            </Button>

            <FormButton loading={isSubmitting} className="w-full sm:w-auto">
              حفظ التعديلات
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}