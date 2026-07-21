"use client";

import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";

import FormSelect from "@/components/forms/FormSelect";
import Button from "@/components/ui/Button";
import { QURAN_SURAHS, getSurahAyahCount, getSurahNumber } from "./quran-data";
import { getNestedFormError } from "../shared/lesson-report-utils";

function buildAyahOptions(count) {
  return Array.from({ length: count }, (_, index) => {
    const value = String(index + 1);

    return { value, label: value };
  });
}

export default function QuranPicker({
  prefix,
  register,
  errors,
  control,
  setValue,
  getValues,
}) {
  const surahName = useWatch({ control, name: `${prefix}.surah` });
  const ayahCount = getSurahAyahCount(surahName);

  const ayahOptions = useMemo(() => {
    return ayahCount > 0 ? buildAyahOptions(ayahCount) : [];
  }, [ayahCount]);

  useEffect(() => {
    if (!ayahCount) return;

    setValue(`${prefix}.surahNumber`, getSurahNumber(surahName), { shouldDirty: true });

    const currentFrom = Number(getValues(`${prefix}.fromAyah`));
    const currentTo = Number(getValues(`${prefix}.toAyah`));

    if (!currentFrom || currentFrom > ayahCount) {
      setValue(`${prefix}.fromAyah`, "1", { shouldDirty: true });
    }

    if (!currentTo || currentTo > ayahCount) {
      setValue(`${prefix}.toAyah`, String(ayahCount), { shouldDirty: true });
    }
  }, [ayahCount, getValues, prefix, setValue, surahName]);

  function handleWholeSurah() {
    if (!ayahCount) return;

    setValue(`${prefix}.surahNumber`, getSurahNumber(surahName), { shouldDirty: true });
    setValue(`${prefix}.fromAyah`, "1", { shouldDirty: true });
    setValue(`${prefix}.toAyah`, String(ayahCount), { shouldDirty: true });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
      <FormSelect
        label="السورة"
        name={`${prefix}.surah`}
        register={register}
        error={getNestedFormError(errors, `${prefix}.surah`)}
        placeholder="اختر السورة"
        options={QURAN_SURAHS}
        rules={{ required: "السورة مطلوبة" }}
      />

      <FormSelect
        label="من آية"
        name={`${prefix}.fromAyah`}
        register={register}
        error={getNestedFormError(errors, `${prefix}.fromAyah`)}
        placeholder={surahName ? "اختر" : "اختر السورة أولًا"}
        options={ayahOptions}
        rules={{ required: "من آية مطلوبة" }}
      />

      <FormSelect
        label="إلى آية"
        name={`${prefix}.toAyah`}
        register={register}
        error={getNestedFormError(errors, `${prefix}.toAyah`)}
        placeholder={surahName ? "اختر" : "اختر السورة أولًا"}
        options={ayahOptions}
        rules={{ required: "إلى آية مطلوبة" }}
      />

      <div className="flex flex-col justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={!ayahCount}
          onClick={handleWholeSurah}
        >
          السورة كاملة
        </Button>

        <p className="text-center text-xs text-slate-500">
          {ayahCount ? `عدد الآيات: ${ayahCount}` : "اختر السورة أولًا"}
        </p>
      </div>
    </div>
  );
}
