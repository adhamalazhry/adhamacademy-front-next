import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

import { createLessonReport } from "@/services/reprts/report.service";
import { getLessonDay, resolveLessonDuration, resolveTeacherName } from "../../lesson-report-utils";
import { useLessonReportState } from "../hooks/useLessonReportState";
import {
  buildBackHrefWithToast,
  buildPayload,
  clearSectionValues,
  createDefaultValues,
  getVisibleSectionsFromInitialValues,
  validatePayload,
} from "./lessonReportForm.helpers";

export function useLessonReportFormController({
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
  } = useLessonReportState({ watchValues });

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

    setVisibleSections(getVisibleSectionsFromInitialValues(initialValues));
  }, [initialValues, setVisibleSections]);

  function removeSection(sectionName) {
    clearSectionValues(sectionName, setValue);
    disableSection(sectionName);
  }

  async function onSubmit(values) {
    try {
      setSubmitError("");

      const payload = buildPayload(values, {
        studentId,
        teacherId,
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
        router.push(buildBackHrefWithToast(backHref));
      }

      if (!initialValues) {
        reset(createDefaultValues(today));
        resetSections();
      }
    } catch (error) {
      setSubmitError(error?.message || "تعذر حفظ التقرير. حاول مرة أخرى.");
    }
  }

  return {
    register,
    control,
    setValue,
    getValues,
    errors,
    isSubmitting,
    watchValues,
    submitHandler: handleSubmit(onSubmit),
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
  };
}
