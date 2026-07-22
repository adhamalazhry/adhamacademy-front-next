import { getSurahAyahCountByName } from "@/lib/quran/surahs";

export function createDefaultValues(dateValue) {
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

export function getVisibleSectionsFromInitialValues(initialValues) {
  return {
    memorization: Array.isArray(initialValues?.memorization) && initialValues.memorization.length > 0,
    nearReview: Array.isArray(initialValues?.nearReview) && initialValues.nearReview.length > 0,
    distantReview: Array.isArray(initialValues?.distantReview) && initialValues.distantReview.length > 0,
    tajweed: Array.isArray(initialValues?.tajweedPoints) && initialValues.tajweedPoints.length > 0,
    nextLesson:
      (Array.isArray(initialValues?.nextLessonMemorization) && initialValues.nextLessonMemorization.length > 0) ||
      (Array.isArray(initialValues?.nextLessonNearReview) && initialValues.nextLessonNearReview.length > 0) ||
      (Array.isArray(initialValues?.nextLessonDistantReview) && initialValues.nextLessonDistantReview.length > 0),
    generalNotes: Boolean(String(initialValues?.generalNotes || "").trim()),
    studentNotes: Boolean(String(initialValues?.studentNotes || "").trim()),
    parentNotes: Boolean(String(initialValues?.parentNotes || "").trim()),
  };
}

export function buildPayload(values, { studentId, teacherId }) {
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

  return {
    studentId,
    teacherId,
    lessonDate: values.lessonDate,
    memorization: (values.memorization ?? []).map(mapQrItem),
    nearReview: (values.nearReview ?? []).map(mapQrItem),
    distantReview: (values.distantReview ?? []).map(mapQrItem),
    tajweedPoints: (values.tajweedPoints ?? []).map(mapTajweedItem),
    nextLessonMemorization: (values.nextLessonMemorization ?? []).map(mapQrItem),
    nextLessonNearReview: (values.nextLessonNearReview ?? []).map(mapQrItem),
    nextLessonDistantReview: (values.nextLessonDistantReview ?? []).map(mapQrItem),
    ...(values.generalNotes?.trim() ? { generalNotes: values.generalNotes.trim() } : {}),
    ...(values.studentNotes?.trim() ? { studentNotes: values.studentNotes.trim() } : {}),
    ...(values.parentNotes?.trim() ? { parentNotes: values.parentNotes.trim() } : {}),
  };
}

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

export function validatePayload(payload) {
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

export function clearSectionValues(sectionName, setValue) {
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
}

export function buildBackHrefWithToast(backHref) {
  const fallback = backHref || "..";

  if (fallback.includes("reportSaved=1")) {
    return fallback;
  }

  const separator = fallback.includes("?") ? "&" : "?";
  return `${fallback}${separator}reportSaved=1`;
}
