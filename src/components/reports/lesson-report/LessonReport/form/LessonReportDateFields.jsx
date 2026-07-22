import FormInput from "@/components/forms/FormInput";

export default function LessonReportDateFields({ register, error, lessonDay }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 p-6 shadow-sm shadow-slate-200/70">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <FormInput
          label="تاريخ الحصة"
          name="lessonDate"
          register={register}
          error={error}
          type="date"
          rules={{ required: "تاريخ الحصة مطلوب" }}
        />

        <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 px-5 py-4 text-right shadow-sm shadow-sky-100/40">
          <p className="text-xs font-bold tracking-[0.14em] text-sky-500">اليوم المحسوب تلقائيا</p>
          <p className="mt-2 text-lg font-extrabold text-slate-900">{lessonDay || "اختر التاريخ"}</p>
        </div>
      </div>
    </section>
  );
}
