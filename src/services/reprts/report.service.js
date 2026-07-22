// services/report.service.js

import { api } from "@/lib/api";

function withDateRange(studentId, from, to) {
  const searchParams = new URLSearchParams();

  if (from) searchParams.set("from", from);
  if (to) searchParams.set("to", to);

  const query = searchParams.toString();
  return `/students/${studentId}/reports${query ? `?${query}` : ""}`;
}

export function createReport(data) {
  return api("/reports", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateReport(id, data) {
  return api(`/reports/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteReport(id) {
  return api(`/reports/${id}`, {
    method: "DELETE",
  });
}

export function getReport(id) {
  return api(`/reports/${id}`);
}

export function getStudentReports(studentId) {
  return api(`/students/${studentId}/reports`);
}

export function getStudentReportsByDate(studentId, from, to) {
  return api(withDateRange(studentId, from, to));
}

export function getTeacherReports(teacherId) {
  return api(`/teachers/${teacherId}/reports`);
}

// Backward-compatible aliases used in existing pages/components.
export function createStudentReport(data) {
  return createReport(data);
}

export function createLessonReport(data) {
  return createReport(data);
}

export function getTeacherStudentReports(teacherId, studentId, params = {}) {
  if (params.from || params.to) {
    return getStudentReportsByDate(studentId, params.from, params.to);
  }

  return getStudentReports(studentId);
}

export function createTeacherStudentReport(teacherId, studentId, data) {
  return createReport({
    ...data,
    teacherId,
    studentId,
  });
}