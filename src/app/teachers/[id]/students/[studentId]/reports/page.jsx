"use client";

import { use } from "react";
import useSWR from "swr";

import StudentReportsList from "@/components/Reports/StudentReportsList";
import { getStudentReports } from "@/services/report.service";

export default function TeacherStudentReportsPage({ params }) {
  const { studentId } = use(params);

  const {
    data: reports,
    isLoading,
    error,
  } = useSWR(
    ["student-reports", studentId],
    () => getStudentReports(studentId)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <StudentReportsList reports={reports} />;
}