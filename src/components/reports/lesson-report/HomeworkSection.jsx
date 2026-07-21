import QuranListSection from "./QuranListSection";

export default function HomeworkSection({
  register,
  errors,
  control,
  setValue,
  getValues,
  onRemoveSection,
}) {
  return (
    <div className="space-y-4 rounded-[1.8rem] border border-teal-200 bg-[linear-gradient(180deg,_rgba(240,253,250,0.95),_rgba(255,255,255,0.98))] p-4 shadow-sm shadow-teal-100/60">
      <div className="rounded-[1.3rem] border border-teal-200 bg-white/80 px-4 py-4 text-right">
        <p className="text-xs font-bold tracking-[0.16em] text-teal-600">المطلوب للحصة القادمة</p>
        <h3 className="mt-2 text-xl font-extrabold text-slate-900">واجب الطالب والتحضير للحصة التالية</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          هذا الجزء مخصص لما يجب على الطالب تحضيره أو مراجعته قبل اللقاء القادم، وهو مختلف عن الجزء الذي يوثق ما تم داخل الحصة الحالية.
        </p>
      </div>

      <QuranListSection
        name="nextLessonMemorization"
        title="المطلوب حفظه للحصة القادمة"
        description="حدّد الحفظ الجديد المطلوب من الطالب حتى الحصة التالية."
        accent="amber"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={onRemoveSection}
        withEvaluation={false}
        withNotes={false}
      />

      <QuranListSection
        name="nextLessonNearReview"
        title="المطلوب مراجعته مراجعة قريبة"
        description="أضف ما يجب مراجعته من القريب قبل الحصة القادمة."
        accent="blue"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={onRemoveSection}
        withEvaluation={false}
        withNotes={false}
      />

      <QuranListSection
        name="nextLessonDistantReview"
        title="المطلوب مراجعته مراجعة بعيدة"
        description="أضف ما يجب مراجعته من المحفوظ الأبعد قبل الحصة القادمة."
        accent="emerald"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={onRemoveSection}
        withEvaluation={false}
        withNotes={false}
      />
    </div>
  );
}
