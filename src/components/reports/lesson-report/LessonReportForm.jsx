"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

import FormInput from "@/components/forms/FormInput";
import LessonReportHeader from "./LessonReport/LessonReportHeader";
import LessonProgress from "./LessonReport/LessonProgress";
import LessonSummary from "./LessonReport/LessonSummary";
import LessonTimeline from "./LessonReport/LessonTimeline";
import LessonSectionPicker from "./LessonReport/LessonSectionPicker";
import LessonFooter from "./LessonReport/LessonFooter";
import LessonStatusMessage from "./LessonReport/LessonStatusMessage";
import MemorizationCard from "./LessonReport/sections/MemorizationCard";
import NearReviewCard from "./LessonReport/sections/NearReviewCard";
import FarReviewCard from "./LessonReport/sections/FarReviewCard";
import TajweedCard from "./LessonReport/sections/TajweedCard";
import HomeworkCard from "./LessonReport/sections/HomeworkCard";
import NotesCard from "./LessonReport/sections/NotesCard";
import { useLessonReport } from "./LessonReport/hooks/useLessonReport";
import { getLessonDay, resolveLessonDuration, resolveTeacherName } from "./lesson-report-utils";
import { createLessonReport } from "@/services/report.service";
import { getSurahAyahCountByName } from "@/lib/quran/surahs";

function createDefaultValues(dateValue) {
  return {
    lessonDate: dateValue,
    generalNotes: "",
    memorization: [],
    nearReview: [],
    distantReview: [],
    tajweedPoints: [],
    nextLessonMemorization: [],
    nextLessonNearReview: [],
    nextLessonDistantReview: [],
    studentNotes: "",
    parentNotes: "",
  };
}

function buildPayload(values, { studentId, teacherId, lessonDuration }) {
  const mapQrItem = (item) => ({
    surah: item.surah,
    surahNumber: Number(item.surahNumber) || 0,
    fromAyah: Number(item.fromAyah) || 1,
    toAyah: Number(item.toAyah) || Number(item.fromAyah) || 1,
    ...(item.evaluation ? { evaluation: item.evaluation } : {}),
    ...(item.notes ? { notes: item.notes } : {}),
  });

  const mapTajweedItem = (item) => ({
    title: item.title,
    ...(item.notes ? { notes: item.notes } : {}),
  });

  const lessonDate = values.lessonDate;

  return {
    studentId,
    teacherId,
    lessonDate,
    memorization: (values.memorization ?? []).map(mapQrItem),
    nearReview: (values.nearReview ?? []).map(mapQrItem),
    distantReview: (values.distantReview ?? []).map(mapQrItem),
    tajweedPoints: (values.tajweedPoints ?? []).map(mapTajweedItem),
    nextLessonMemorization: (values.nextLessonMemorization ?? []).map(mapQrItem),
    nextLessonNearReview: (values.nextLessonNearReview ?? []).map(mapQrItem),
    nextLessonDistantReview: (values.nextLessonDistantReview ?? []).map(mapQrItem),
    ...(values.generalNotes?.trim()
      ? { generalNotes: values.generalNotes.trim() }
      : {}),
    ...(values.studentNotes?.trim()
      ? { studentNotes: values.studentNotes.trim() }
      : {}),
    ...(values.parentNotes?.trim()
      ? { parentNotes: values.parentNotes.trim() }
      : {}),
  };
}

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
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [statusMessage, setStatusMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const lessonDuration = resolveLessonDuration(student);
  const teacherName = resolveTeacherName(student, teacher);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || createDefaultValues(today),
  });

  const dateValue = watch("lessonDate");
  const lessonDay = getLessonDay(dateValue);
  const watchValues = watch();

  const {
    sections,
    hiddenSections,
    visibleSections,
    setVisibleSections,
    activeSection,
    setActiveSection,
    enableSection,
    disableSection,
    resetSections,
    progress,
    summary,
  } = useLessonReport({ watchValues });

  useEffect(() => {
    if (!statusMessage) return undefined;

    const timer = window.setTimeout(() => setStatusMessage(""), 2500);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    if (!submitError) return undefined;

    const timer = window.setTimeout(() => setSubmitError(""), 3500);
    return () => window.clearTimeout(timer);
  }, [submitError]);

  useEffect(() => {
    if (!initialValues) return;
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    if (!initialValues) return;

    const nextVisibleSections = {
      memorization: Array.isArray(initialValues.memorization) && initialValues.memorization.length > 0,
      nearReview: Array.isArray(initialValues.nearReview) && initialValues.nearReview.length > 0,
      distantReview: Array.isArray(initialValues.distantReview) && initialValues.distantReview.length > 0,
      tajweed: Array.isArray(initialValues.tajweedPoints) && initialValues.tajweedPoints.length > 0,
      nextLesson:
        (Array.isArray(initialValues.nextLessonMemorization) && initialValues.nextLessonMemorization.length > 0) ||
        (Array.isArray(initialValues.nextLessonNearReview) && initialValues.nextLessonNearReview.length > 0) ||
        (Array.isArray(initialValues.nextLessonDistantReview) && initialValues.nextLessonDistantReview.length > 0),
      generalNotes: Boolean(String(initialValues.generalNotes || "").trim()),
      studentNotes: Boolean(String(initialValues.studentNotes || "").trim()),
      parentNotes: Boolean(String(initialValues.parentNotes || "").trim()),
    };

    setVisibleSections(nextVisibleSections);
  }, [initialValues, setVisibleSections]);

  function validateRangeItem(item, sectionLabel, index) {
    const surahNumber = Number(item?.surahNumber || 0);
    const fromAyah = Number(item?.fromAyah || 0);
    const toAyah = Number(item?.toAyah || 0);
    const surah = String(item?.surah || "").trim();
    const maxAyahs = getSurahAyahCountByName(surah);

    if (!surah) {
      throw new Error(`${sectionLabel}: السورة مطلوبة (العنصر ${index + 1})`);
    }

    if (surahNumber < 1 || surahNumber > 114) {
      throw new Error(`${sectionLabel}: رقم السورة يجب أن يكون بين 1 و 114 (العنصر ${index + 1})`);
    }

    if (!Number.isFinite(fromAyah) || fromAyah < 1) {
      throw new Error(`${sectionLabel}: قيمة من آية غير صحيحة (العنصر ${index + 1})`);
    }

    if (!Number.isFinite(toAyah) || toAyah < fromAyah) {
      throw new Error(`${sectionLabel}: قيمة إلى آية يجب أن تكون أكبر أو تساوي من آية (العنصر ${index + 1})`);
    }

    if (maxAyahs > 0 && toAyah > maxAyahs) {
      throw new Error(`${sectionLabel}: إلى آية يجب ألا تتجاوز ${maxAyahs} (${surah})`);
    }
  }

  function validatePayload(payload) {
    if (!payload?.teacherId) {
      throw new Error("المعلم مطلوب قبل حفظ التقرير");
    }

    if (!payload?.studentId) {
      throw new Error("الطالب مطلوب قبل حفظ التقرير");
    }

    const lessonDate = String(payload?.lessonDate || "").trim();
    if (!lessonDate) {
      throw new Error("تاريخ الحصة مطلوب");
    }

    if (Number.isNaN(new Date(lessonDate).getTime())) {
      throw new Error("تاريخ الحصة غير صالح");
    }

    const sections = [
      { label: "قسم الحفظ", items: payload.memorization },
      { label: "قسم المراجعة القريبة", items: payload.nearReview },
      { label: "قسم المراجعة البعيدة", items: payload.distantReview },
      { label: "واجب الحصة القادمة - حفظ", items: payload.nextLessonMemorization },
      { label: "واجب الحصة القادمة - مراجعة قريبة", items: payload.nextLessonNearReview },
      { label: "واجب الحصة القادمة - مراجعة بعيدة", items: payload.nextLessonDistantReview },
    ];

    sections.forEach((section) => {
      (section.items || []).forEach((item, index) => {
        validateRangeItem(item, section.label, index);
      });
    });
  }

  function removeSection(sectionName) {
    if (sectionName === "memorization") {
      setValue("memorization", [], { shouldDirty: true });
    }

    if (sectionName === "nearReview") {
      setValue("nearReview", [], { shouldDirty: true });
    }

    if (sectionName === "distantReview") {
      setValue("distantReview", [], { shouldDirty: true });
    }

    if (sectionName === "tajweed" || sectionName === "tajweedPoints") {
      setValue("tajweedPoints", [], { shouldDirty: true });
    }

    if (sectionName === "nextLesson") {
      setValue("nextLessonMemorization", [], { shouldDirty: true });
      setValue("nextLessonNearReview", [], { shouldDirty: true });
      setValue("nextLessonDistantReview", [], { shouldDirty: true });
    }

    if (sectionName === "generalNotes") {
      setValue("generalNotes", "", { shouldDirty: true });
    }

    if (sectionName === "studentNotes") {
      setValue("studentNotes", "", { shouldDirty: true });
    }

    if (sectionName === "parentNotes") {
      setValue("parentNotes", "", { shouldDirty: true });
    }

    disableSection(sectionName);
  }

  function buildBackHrefWithToast() {
    const fallback = backHref || "..";

    if (fallback.includes("reportSaved=1")) {
      return fallback;
    }

    const separator = fallback.includes("?") ? "&" : "?";
    return `${fallback}${separator}reportSaved=1`;
  }

  async function onSubmit(values) {
    try {
      setSubmitError("");

      const payload = buildPayload(values, {
        studentId,
        teacherId,
        lessonDuration,
      });

      validatePayload(payload);

      const submitFn = onSubmitReport || createLessonReport;
      const createdReport = await submitFn(payload);

      if (reportsKey) {
        await mutate(reportsKey);
      }

      if (studentId) {
        await mutate(["student-reports", teacherId || "standalone", studentId]);
      }

      setStatusMessage(successText);

      if (typeof onSuccess === "function") {
        onSuccess(createdReport);
      } else {
        router.push(buildBackHrefWithToast());
      }

      if (!initialValues) {
        reset(createDefaultValues(today));
        resetSections();
      }
    } catch (error) {
      setSubmitError(error?.message || "تعذر حفظ التقرير. حاول مرة أخرى.");
    }
  }

  return (
    <form
      dir="rtl"
      className="space-y-6 rounded-[2.2rem] bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.45),_rgba(248,250,252,0.92)_45%,_rgba(255,255,255,1))] p-3 md:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LessonStatusMessage message={statusMessage} type="success" />
      <LessonStatusMessage message={submitError} type="error" />

      <LessonReportHeader
        student={student}
        teacherName={teacherName}
        teacherEmail={teacher?.email || student?.teacher?.email || ""}
        dateValue={dateValue}
        lessonDay={lessonDay}
        lessonDuration={lessonDuration}
      />

      <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/70">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <FormInput
            label="تاريخ الحصة"
            name="lessonDate"
            register={register}
            error={errors?.lessonDate}
            type="date"
            rules={{ required: "تاريخ الحصة مطلوب" }}
          />

          <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 px-5 py-4 text-right shadow-sm shadow-sky-100/40">
            <p className="text-xs font-bold tracking-[0.14em] text-sky-500">اليوم المحسوب تلقائيًا</p>
            <p className="mt-2 text-lg font-extrabold text-slate-900">
              {lessonDay || "اختر التاريخ"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <LessonSectionPicker
            sections={hiddenSections}
            onEnableSection={enableSection}
          />

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
            description="ملاحظات خاصة بأداء الطالب داخل الحصة."
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

        <aside className="space-y-4 xl:sticky xl:top-5 xl:self-start">
          <LessonProgress
            progress={progress}
            enabledSections={sections.filter((section) => section.isVisible)}
          />
          <LessonSummary summary={summary} />
          <LessonTimeline
            sections={sections}
            activeSection={activeSection}
            onFocusSection={(sectionKey) => {
              setActiveSection(sectionKey);
              if (!visibleSections[sectionKey]) {
                enableSection(sectionKey);
                return;
              }

              const element = document.getElementById(`section-${sectionKey}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          />
        </aside>
      </div>

      <LessonFooter
        backHref={backHref}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </form>
  );
}
