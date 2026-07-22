import LessonSectionPicker from "../navigation/LessonSectionPicker";
import MemorizationCard from "../sections/MemorizationCard";
import NearReviewCard from "../sections/NearReviewCard";
import FarReviewCard from "../sections/FarReviewCard";
import TajweedCard from "../sections/TajweedCard";
import HomeworkCard from "../sections/HomeworkCard";
import NotesCard from "../sections/NotesCard";

export default function LessonReportFormSections({
  hiddenSections,
  visibleSections,
  enableSection,
  removeSection,
  register,
  control,
  setValue,
  getValues,
  errors,
  watchValues,
}) {
  return (
    <section className="space-y-4">
      <LessonSectionPicker sections={hiddenSections} onEnableSection={enableSection} />

      <MemorizationCard
        visible={visibleSections.memorization}
        sectionKey="memorization"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={() => removeSection("memorization")}
      />

      <NearReviewCard
        visible={visibleSections.nearReview}
        sectionKey="nearReview"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={() => removeSection("nearReview")}
      />

      <FarReviewCard
        visible={visibleSections.distantReview}
        sectionKey="distantReview"
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        onRemoveSection={() => removeSection("distantReview")}
      />

      <TajweedCard
        visible={visibleSections.tajweed}
        sectionKey="tajweed"
        register={register}
        errors={errors}
        control={control}
        onRemoveSection={() => removeSection("tajweed")}
      />

      <HomeworkCard
        visible={visibleSections.nextLesson}
        sectionKey="nextLesson"
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        getValues={getValues}
        onRemoveSection={() => removeSection("nextLesson")}
      />

      <NotesCard
        visible={visibleSections.generalNotes}
        sectionKey="generalNotes"
        tone="slate"
        name="generalNotes"
        title="ملاحظات عامة"
        description="ملخص سريع للحصة."
        register={register}
        errors={errors}
        placeholder="اكتب الملاحظات العامة هنا"
        value={watchValues.generalNotes}
      />

      <NotesCard
        visible={visibleSections.studentNotes}
        sectionKey="studentNotes"
        tone="fuchsia"
        name="studentNotes"
        title="ملاحظات الطالب"
        description="ملاحظات خاصة باداء الطالب داخل الحصة."
        register={register}
        errors={errors}
        placeholder="اكتب ملاحظاتك عن الطالب هنا"
        value={watchValues.studentNotes}
      />

      <NotesCard
        visible={visibleSections.parentNotes}
        sectionKey="parentNotes"
        tone="rose"
        name="parentNotes"
        title="ملاحظات ولي الامر"
        description="رسالة او ملاحظة موجهة لولي الامر."
        register={register}
        errors={errors}
        placeholder="اكتب الملاحظات الموجهة لولي الامر هنا"
        value={watchValues.parentNotes}
      />
    </section>
  );
}
