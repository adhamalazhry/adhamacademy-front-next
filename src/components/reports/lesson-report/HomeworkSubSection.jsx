"use client";

import { useFieldArray } from "react-hook-form";

import Button from "@/components/ui/Button";
import DynamicSection from "./DynamicSection";
import ReportItemCard from "./ReportItemCard";
import QuranPicker from "./QuranPicker";

function createItem() {
  return {
    surah: "",
    surahNumber: 0,
    fromAyah: "1",
    toAyah: "1",
  };
}

export default function HomeworkSubSection({
  name,
  title,
  description,
  accent = "amber",
  register,
  control,
  setValue,
  getValues,
  errors,
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <DynamicSection title={title} description={description} accent={accent}>
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-500">
            لا توجد عناصر بعد.
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
            <QuranPicker
              prefix={`${name}.${index}`}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
          </ReportItemCard>
        ))}

        <Button type="button" onClick={() => append(createItem())}>
          إضافة عنصر
        </Button>
      </div>
    </DynamicSection>
  );
}
