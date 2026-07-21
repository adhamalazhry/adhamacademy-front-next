"use client";

import { useFieldArray } from "react-hook-form";

import Button from "@/components/ui/Button";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import DynamicSection from "./DynamicSection";
import ReportItemCard from "./ReportItemCard";
import { getNestedFormError } from "./lesson-report-utils";

function createItem() {
  return { title: "", notes: "" };
}

export default function TajweedSection({
  name,
  title,
  description,
  accent = "violet",
  register,
  errors,
  control,
  onRemoveSection,
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
            لا توجد نقاط بعد.
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
              <FormInput
                label="عنوان الدرس أو الحكم"
                name={`${name}.${index}.title`}
                register={register}
                error={getNestedFormError(errors, `${name}.${index}.title`)}
                placeholder="مثال: أحكام النون الساكنة"
                rules={{ required: "العنوان مطلوب" }}
              />

              <FormTextarea
                label="الملاحظات"
                name={`${name}.${index}.notes`}
                register={register}
                error={getNestedFormError(errors, `${name}.${index}.notes`)}
                placeholder="اكتب ملاحظاتك هنا"
                rows={3}
              />
            </div>
          </ReportItemCard>
        ))}

        <Button type="button" onClick={() => append(createItem())}>
          إضافة نقطة تجويد
        </Button>
      </div>
    </DynamicSection>
  );
}
