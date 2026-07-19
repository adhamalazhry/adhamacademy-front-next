// services/report.service.js

import { api } from "@/lib/api";

export function getStudentReports(studentId) {
  return api(`/reports/student/${studentId}`);
}