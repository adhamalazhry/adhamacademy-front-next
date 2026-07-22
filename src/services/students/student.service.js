// src/services/student.service.js

import { api } from "@/lib/api";
import { getTeacherStudents } from "@/services/teachers/teacher-student.service";

export function getStudents() {
  return api("/students");
}

export async function getStudent(id) {
  const res = await api(`/students/${id}`);

  return res;
}

export async function getTeacherStudent(teacherId, studentId) {
  const students = await getTeacherStudents(teacherId);
  const matchedStudent = students.find(
    (student) => String(student.id) === String(studentId),
  );

  if (matchedStudent) {
    return matchedStudent;
  }

  const student = await getStudent(studentId);
  const linkedTeacherId =
    student?.teacherId ?? student?.teacher?.id ?? student?.teacher?.teacherId ?? null;

  if (linkedTeacherId !== null && String(linkedTeacherId) === String(teacherId)) {
    return student;
  }

  const error = new Error("STUDENT_NOT_ASSIGNED_TO_TEACHER");
  error.code = "STUDENT_NOT_ASSIGNED_TO_TEACHER";
  throw error;
}

export function createStudent(data) {
  return api("/students", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateStudent(id, data) {
  return api(`/students/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function assignTeacherToStudent(studentId, teacherId) {
  return api(`/students/${studentId}`, {
    method: "PATCH",
    body: JSON.stringify({ teacherId }),
  });
}

export function deleteStudent(id) {
  return api(`/students/${id}`, {
    method: "DELETE",
  });
}