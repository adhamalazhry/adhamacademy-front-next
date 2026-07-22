"use client";

import {
  DisplayHeader,
  DisplayInsights,
  StatusStack,
} from "./LessonReport/display";
import {
  FormFooter,
  FormDateFields,
  FormSections,
  useLessonReportFormController,
} from "./LessonReport/form";

export default function LessonReportForm({
  student,
  teacher,
  teacherId,
  studentId,
  reportsKey,
  backHref,
  onSuccess,
  initialValues,
  submitLabel = "حفظ التقرير",
  successText = "تم حفظ تقرير الحصة بنجاح",
  onSubmitReport,
}) {
  const {
    register,
    control,
    setValue,
    getValues,
    errors,
    isSubmitting,
    watchValues,
    submitHandler,
    statusMessage,
    submitError,
    lessonDuration,
    teacherName,
    dateValue,
    lessonDay,
    sections,
    hiddenSections,
    visibleSections,
    activeSection,
    setActiveSection,
    enableSection,
    removeSection,
    progress,
    summary,
  } = useLessonReportFormController({
    student,
    teacher,
    teacherId,
    studentId,
    reportsKey,
    backHref,
    onSuccess,
    initialValues,
    successText,
    onSubmitReport,
  });

  return (
    <form
      dir="rtl"
      className="space-y-6 rounded-[2.2rem] bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.45),_rgba(248,250,252,0.92)_45%,_rgba(255,255,255,1))] p-3 md:p-5 "
      onSubmit={submitHandler}
    >
      <StatusStack successMessage={statusMessage} errorMessage={submitError} />

      <DisplayHeader
        student={student}
        teacherName={teacherName}
       
        dateValue={dateValue}
        lessonDay={lessonDay}
        lessonDuration={lessonDuration}
      />

      <FormDateFields register={register} error={errors?.lessonDate} lessonDay={lessonDay} />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]  ">
        <FormSections
          hiddenSections={hiddenSections}
          visibleSections={visibleSections}
          enableSection={enableSection}
          removeSection={removeSection}
          register={register}
          control={control}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          watchValues={watchValues}
        />

        <DisplayInsights
          progress={progress}
          sections={sections}
          summary={summary}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          visibleSections={visibleSections}
          enableSection={enableSection}
        />
      </div>

      <FormFooter
        backHref={backHref}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </form>
  );
}
