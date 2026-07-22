export function formatTeacherStudentCount(teacher) {
  const count =
    teacher?.studentsCount ??
    teacher?.students?.length ??
    0;

  return `${count} طالب`;
}

export function formatTeacherHourlyRate(teacher) {
  if (!teacher?.hourlyRate) return "غير محدد";

  return `${teacher.hourlyRate} ${teacher.currency ?? "SAR"}`;
}