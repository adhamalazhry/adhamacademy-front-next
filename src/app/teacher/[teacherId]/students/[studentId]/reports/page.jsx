"use client";

import { use } from "react";
import LessonReportsWorkspace from "@/components/reports/lesson-report/LessonReportsWorkspace";
import { teacherStudentReportNewPath, teacherStudentReportsPath } from "@/lib/routes/teacher";

export default function TeacherStudentReportsPage({ params }) {
  const { teacherId, studentId } = use(params);

  return (
    <LessonReportsWorkspace
      studentId={studentId}
      teacherId={teacherId}
      createHref={teacherStudentReportNewPath(teacherId, studentId)}
      backHref={teacherStudentReportsPath(teacherId, studentId)}
      routeVariant="teacher"
    />
  );
}