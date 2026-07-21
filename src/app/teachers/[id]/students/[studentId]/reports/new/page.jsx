"use client";

import { use } from "react";
import useSWR from "swr";

import LessonReportForm from "@/components/reports/lesson-report/LessonReportForm";
import { getStudent } from "@/services/student.service";
import { getTeacher } from "@/services/teacher.service";

export default function NewLessonReportPage({ params }) {
  const { id, studentId } = use(params);

  const {
    data: student,
    isLoading: studentLoading,
    error: studentError,
  } = useSWR(
    studentId ? ["lesson-report-student", studentId] : null,
    () => getStudent(studentId),
  );

  const {
    data: teacher,
    isLoading: teacherLoading,
    error: teacherError,
  } = useSWR(
    id ? ["lesson-report-teacher", id] : null,
    () => getTeacher(id),
  );

  if (studentLoading || teacherLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل نموذج التقرير...</p>;
  }

  if (studentError || teacherError) {
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات التقرير</p>;
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <LessonReportForm
        student={student}
        teacher={teacher}
        studentId={studentId}
        teacherId={id}
        reportsKey={["student-reports", id || "standalone", studentId]}
        backHref={`/teachers/${id}/students/${studentId}/reports`}
      />
    </div>
  );
}
