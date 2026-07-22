import { getTeacherStudents } from "@/services/teachers/teacher-student.service";
import { getStudentReports } from "@/services/reprts/report.service";

export async function getTeacherPortalData(teacherId) {
  const students = await getTeacherStudents(teacherId);

  const reportsByStudent = await Promise.all(
    students.map(async (student) => {
      try {
        const reports = await getStudentReports(student.id);

        return reports.map((report) => ({
          ...report,
          studentId: student.id,
          studentName: student.name,
        }));
      } catch {
        return [];
      }
    })
  );

  const reports = reportsByStudent
    .flat()
    .sort(
      (a, b) =>
        new Date(b.lessonDate || 0) - new Date(a.lessonDate || 0)
    );

  return {
    students,
    reports,
    generatedAt: new Date().toISOString(),
  };
}