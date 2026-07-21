export function getLessonDay(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ar-EG", { weekday: "long" });
}

export function resolveLessonDuration(student) {
  const duration =
    student?.lessonDuration ??
    student?.subscription?.lessonDuration ??
    student?.subscription?.durationMinutes ??
    student?.subscription?.sessionDurationMinutes ??
    null;

  return duration === null || duration === undefined || duration === ""
    ? null
    : Number(duration);
}

export function resolveTeacherName(student, teacher) {
  return teacher?.name || student?.teacher?.name || "غير محدد";
}

export function normalizeSurahName(value) {
  return String(value || "").trim();
}

export function getNestedFormError(errors, path) {
  if (!errors || !path) return undefined;

  return path.split(".").reduce((current, key) => {
    if (current == null) return undefined;

    return current[key];
  }, errors);
}
