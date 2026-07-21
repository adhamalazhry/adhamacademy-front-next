function parseJsonArray(value) {
  if (typeof value !== "string") return null;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function extractArray(value) {
  if (Array.isArray(value)) return value;

  const parsedArray = parseJsonArray(value);
  if (parsedArray) return parsedArray;

  if (value && typeof value === "object") {
    if (Array.isArray(value.items)) return value.items;
    if (Array.isArray(value.data)) return value.data;
    if (Array.isArray(value.value)) return value.value;
  }

  return [];
}

function getByPath(source, path) {
  if (!source || !path) return undefined;
  return path.split(".").reduce((current, key) => {
    if (current == null) return undefined;
    return current[key];
  }, source);
}

function pickArrayByPaths(source, paths) {
  for (const path of paths) {
    const rawValue = getByPath(source, path);
    const arrayValue = extractArray(rawValue);
    if (arrayValue.length > 0) {
      return arrayValue;
    }
  }

  // Return first existing even if empty to preserve explicit empty arrays.
  for (const path of paths) {
    const rawValue = getByPath(source, path);
    if (rawValue !== undefined && rawValue !== null) {
      return extractArray(rawValue);
    }
  }

  return [];
}

function normalizeQuranItem(item) {
  if (!item || typeof item !== "object") {
    return {
      surah: "",
      surahNumber: 0,
      fromAyah: "",
      toAyah: "",
      evaluation: "",
      notes: "",
    };
  }

  return {
    ...item,
    surah: item.surah || item.surahName || item.name || "",
    surahNumber: item.surahNumber ?? item.surah_no ?? item.surahId ?? 0,
    fromAyah: item.fromAyah ?? item.from ?? item.startAyah ?? item.from_ayah ?? "",
    toAyah: item.toAyah ?? item.to ?? item.endAyah ?? item.to_ayah ?? "",
    evaluation: item.evaluation || item.grade || "",
    notes: item.notes || item.note || "",
  };
}

export function resolveHomeworkSections(report) {
  const memorization = pickArrayByPaths(report, [
    "nextLessonMemorization",
    "next_lesson_memorization",
    "nextLesson.memorization",
    "nextLesson.homeworkMemorization",
  ]).map(normalizeQuranItem);

  const nearReview = pickArrayByPaths(report, [
    "nextLessonNearReview",
    "nextLessonRevision",
    "next_lesson_near_review",
    "nextLesson.nearReview",
    "nextLesson.revision",
  ]).map(normalizeQuranItem);

  const distantReview = pickArrayByPaths(report, [
    "nextLessonDistantReview",
    "nextLessonFarReview",
    "next_lesson_distant_review",
    "nextLesson.distantReview",
    "nextLesson.farReview",
  ]).map(normalizeQuranItem);

  // Legacy flat fallback when arrays are absent.
  const fallbackMemorization =
    memorization.length === 0 && report?.homeworkSurah
      ? [
          normalizeQuranItem({
            surah: report.homeworkSurah,
            fromAyah: report.homeworkFrom,
            toAyah: report.homeworkTo,
          }),
        ]
      : memorization;

  const fallbackNearReview =
    nearReview.length === 0 && report?.homeworkRevisionSurah
      ? [
          normalizeQuranItem({
            surah: report.homeworkRevisionSurah,
            fromAyah: report.homeworkRevisionFrom,
            toAyah: report.homeworkRevisionTo,
          }),
        ]
      : nearReview;

  return {
    memorization: fallbackMemorization,
    nearReview: fallbackNearReview,
    distantReview,
  };
}
