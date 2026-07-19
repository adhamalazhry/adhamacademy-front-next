import { api } from "@/lib/api";

export function getTeachers() {
  return api("/teachers");
}

export function getTeacher(id) {
  return api(`/teachers/${id}`);
}

export function createTeacher(data) {
  return api("/teachers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTeacher(id, data) {
  return api(`/teachers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteTeacher(id) {
  return api(`/teachers/${id}`, {
    method: "DELETE",
  });
}
export async function getTeacherStudents(id) {
  return api(`/teachers/${id}/students`);
}
