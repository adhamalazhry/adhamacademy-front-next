"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import FormButton from "@/components/forms/FormButton";
import TeacherFormFields from "./TeacherFormFields";
import Toast from "@/components/ui/Toast";
import {
  createTeacher,
  updateTeacher,
} from "@/services/teacher.service";

const defaultValues = {
  name: "",
  email: "",
  hourlyRate: 0,
  currency: "EGP",
};

function buildFormValues(teacher) {
  if (!teacher) {
    return defaultValues;
  }

  return {
    name: teacher.name ?? "",
    email: teacher.email ?? "",
    hourlyRate: teacher.hourlyRate ?? 0,
    currency: teacher.currency ?? "",
  };
}

function buildPayload(values) {
  const currency = String(values.currency || "").trim().toUpperCase();

  return {
    name: values.name?.trim(),
    email: values.email?.trim() || undefined,
    hourlyRate:
      values.hourlyRate === "" ? undefined : Number(values.hourlyRate),
    currency: currency || undefined,
  };
}

export default function TeacherUpsertForm({
  teacher,
  title = "البيانات الأساسية",
  description = "أدخل البيانات الأساسية الخاصة بالمعلم.",
  submitLabel = teacher ? "تحديث المعلم" : "حفظ المعلم",
  successMessage = teacher ? "تم تحديث بيانات المعلم بنجاح" : "تم إضافة المعلم بنجاح",
  onSuccess,
}) {
  const { mutate } = useSWRConfig();
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: buildFormValues(teacher),
  });

  useEffect(() => {
    reset(buildFormValues(teacher));
  }, [teacher, reset]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  async function onSubmit(values) {
    const payload = buildPayload(values);

    const savedTeacher = teacher?.id
      ? await updateTeacher(teacher.id, payload)
      : await createTeacher(payload);

    await mutate("/teachers");

    if (teacher?.id) {
      await mutate(`/teachers/${teacher.id}`);
    }

    setToastMessage(successMessage);

    if (!teacher?.id) {
      reset(defaultValues);
    }

    if (typeof onSuccess === "function") {
      onSuccess(savedTeacher);
    }
  }

  return (
    <>
      <Toast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TeacherFormFields
          register={register}
          errors={errors}
          sectionTitle={title}
          sectionDescription={description}
          currencyDefaultValue={teacher?.currency ?? "EGP"}
        />

        <FormButton loading={isSubmitting} fullWidth>
          {submitLabel}
        </FormButton>
      </form>
    </>
  );
}