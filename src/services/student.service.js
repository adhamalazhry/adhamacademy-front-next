// src/services/student.service.js

import { api } from "@/lib/api";

export function getStudents() {
  return api("/students");
}

export async function getStudent(id) {
  const res = await api(`/students/${id}`);

  return res;
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

export function deleteStudent(id) {
  return api(`/students/${id}`, {
    method: "DELETE",
  });
}