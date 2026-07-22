"use client";

import { use } from "react";
import useSWR from "swr";
import LessonReportForm from "@/components/reports/lesson-report/LessonReportForm";
import { getTeacher } from "@/services/teachers/teacher.service";
import { getTeacherStudent } from "@/services/students/student.service";
import { teacherStudentReportsPath } from "@/lib/routes/teacher";

export default function NewLessonReportPage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading: studentLoading, error: studentError } = useSWR(
    teacherId && studentId ? ["teacher-student-report-form", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const { data: teacher, isLoading: teacherLoading, error: teacherError } = useSWR(
    teacherId ? ["lesson-report-teacher", teacherId] : null,
    () => getTeacher(teacherId),
  );

  if (studentLoading || teacherLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل نموذج التقرير...</p>;
  }

  if (studentError || teacherError) {
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات التقرير</p>;
  }

  if (!student) {
    return <p className="p-6 text-slate-600">الطالب غير موجود أو غير مرتبط بهذا المعلم.</p>;
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <LessonReportForm
        student={student}
        teacher={teacher}
        studentId={studentId}
        teacherId={teacherId}
        reportsKey={["student-reports", teacherId || "standalone", studentId]}
        backHref={teacherStudentReportsPath(teacherId, studentId)}
      />
    </div>
  );
}