"use client";

import { useFieldArray } from "react-hook-form";

import Button from "@/components/ui/Button";
import FormSelect from "@/components/forms/FormSelect";
import FormTextarea from "@/components/forms/FormTextarea";
import DynamicSection from "../sections/DynamicSection";
import ReportItemCard from "../sections/ReportItemCard";
import QuranPicker from "./QuranPicker";
import { getNestedFormError } from "../shared/lesson-report-utils";

const evaluationOptions = [
  { value: "ممتاز", label: "ممتاز" },
  { value: "جيد جدًا", label: "جيد جدًا" },
  { value: "جيد", label: "جيد" },
  { value: "يحتاج متابعة", label: "يحتاج متابعة" },
];

function createItem() {
  return {
    surah: "",
    surahNumber: 0,
    fromAyah: "1",
    toAyah: "1",
    evaluation: "",
    notes: "",
  };
}

export default function QuranListSection({
  name,
  title,
  description,
  accent = "emerald",
  register,
  control,
  setValue,
  getValues,
  errors,
  onRemoveSection,
  withEvaluation = true,
  withNotes = true,
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <DynamicSection
      title={title}
      description={description}
      accent={accent}
      onRemove={onRemoveSection}
    >
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-500">
            لا توجد عناصر بعد. استخدم زر الإضافة لبدء الإدخال.
          </div>
        ) : null}

        {fields.map((field, index) => (
          <ReportItemCard
            key={field.id}
            index={index}
            title={title}
            accent={accent}
            onRemove={() => remove(index)}
          >
            <div className="space-y-4">
              <QuranPicker
                prefix={`${name}.${index}`}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                getValues={getValues}
              />

              {withEvaluation ? (
                <FormSelect
                  label="التقييم"
                  name={`${name}.${index}.evaluation`}
                  register={register}
                  error={getNestedFormError(errors, `${name}.${index}.evaluation`)}
                  placeholder="اختر التقييم"
                  options={evaluationOptions}
                />
              ) : null}

              {withNotes ? (
                <FormTextarea
                  label="ملاحظات"
                  name={`${name}.${index}.notes`}
                  register={register}
                  error={getNestedFormError(errors, `${name}.${index}.notes`)}
                  placeholder="أضف ملاحظاتك هنا"
                  rows={3}
                />
              ) : null}
            </div>
          </ReportItemCard>
        ))}

        <Button type="button" onClick={() => append(createItem())}>
          إضافة عنصر
        </Button>
      </div>
    </DynamicSection>
  );
}
