import { api } from "@/lib/api";

function unwrapResponse(response) {
  if (response && typeof response === "object") {
    return response.data ?? response.students ?? response.items ?? response;
  }

  return response;
}

/**
 * جلب جميع طلاب المعلم
 */
export function getTeacherStudents(teacherId) {
  return api(`/teachers/${teacherId}/students`).then((response) => {
    const payload = unwrapResponse(response);
    return Array.isArray(payload) ? payload : [];
  });
}
