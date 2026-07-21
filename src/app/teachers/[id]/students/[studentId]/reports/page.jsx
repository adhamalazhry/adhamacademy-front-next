"use client";

import { use } from "react";
import LessonReportsWorkspace from "@/components/reports/lesson-report/LessonReportsWorkspace";

export default function TeacherStudentReportsPage({ params }) {
  const { id, studentId } = use(params);

  return (
    <LessonReportsWorkspace
      studentId={studentId}
      teacherId={id}
      createHref={`/teachers/${id}/students/${studentId}/reports/new`}
      routeVariant="teachers"
    />
  );
}