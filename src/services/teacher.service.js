import { api } from "@/lib/api";

function buildTeacherPayload(data = {}) {
  const payload = { ...data };

  if ("hourlyRate" in payload) {
    const hourlyRate = Number(payload.hourlyRate);

    if (payload.hourlyRate === "" || payload.hourlyRate === null || payload.hourlyRate === undefined || Number.isNaN(hourlyRate)) {
      delete payload.hourlyRate;
    } else {
      payload.hourlyRate = hourlyRate;
    }
  }

  if ("currency" in payload) {
    const normalizedCurrency = String(payload.currency || "").trim().toUpperCase();

    if (normalizedCurrency) {
      payload.currency = normalizedCurrency;
    } else {
      delete payload.currency;
    }
  }

  Object.keys(payload).forEach((key) => {
    if (payload[key] === "") {
      delete payload[key];
    }
  });

  return payload;
}

function unwrapResponse(response) {
  if (response && typeof response === "object") {
    return response.data ?? response.items ?? response.teachers ?? response;
  }

  return response;
}

export function normalizeTeacher(teacher) {
  if (!teacher) return teacher;

  return {
    ...teacher,
    hourlyRate: Number(teacher.hourlyRate ?? teacher.hourly_rate ?? 0),
  };
}

export function normalizeTeachersList(response) {
  const payload = unwrapResponse(response);

  if (Array.isArray(payload)) {
    return payload.map(normalizeTeacher);
  }

  if (payload && Array.isArray(payload.teachers)) {
    return payload.teachers.map(normalizeTeacher);
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data.map(normalizeTeacher);
  }

  return [];
}

export function normalizeTeacherResponse(response) {
  return normalizeTeacher(unwrapResponse(response));
}

export function getTeacherStudentCount(teacher) {
  if (!teacher) return 0;

  if (Number.isFinite(Number(teacher.studentsCount))) {
    return Number(teacher.studentsCount);
  }

  if (Array.isArray(teacher.students)) {
    return teacher.students.length;
  }

  return null;
}

export function formatTeacherStudentCount(teacher) {
  const count = getTeacherStudentCount(teacher);

  if (count === null) {
    return "غير متاح";
  }

  if (count === 0) {
    return "0";
  }

  return `${count} ${count === 1 ? "طالب" : "طلاب"}`;
}

export function formatTeacherHourlyRate(hourlyRate, currency = "") {
  const rate = Number(hourlyRate);

  if (!Number.isFinite(rate) || rate <= 0) {
    return "";
  }

  return currency ? `${rate} ${currency}` : `${rate}`;
}

export function getTeachers() {
  return api("/teachers")
    .then(normalizeTeachersList)
    .then(async (teachers) => {
      return Promise.all(
        teachers.map(async (teacher) => {
          try {
            const students = await getTeacherStudents(teacher.id);

            return {
              ...teacher,
              studentsCount: students.length,
            };
          } catch {
            return {
              ...teacher,
              studentsCount: 0,
            };
          }
        }),
      );
    });
}

export function getTeacher(id) {
  return api(`/teachers/${id}`).then(normalizeTeacherResponse);
}

export function createTeacher(data) {
  return api("/teachers", {
    method: "POST",
    body: JSON.stringify(buildTeacherPayload(data)),
  }).then(normalizeTeacherResponse);
}

export function updateTeacher(id, data) {
  return api(`/teachers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(buildTeacherPayload(data)),
  }).then(normalizeTeacherResponse);
}

export function deleteTeacher(id) {
  return api(`/teachers/${id}`, {
    method: "DELETE",
  });
}
export async function getTeacherStudents(id) {
  return api(`/teachers/${id}/students`).then((response) => {
    const payload = unwrapResponse(response);

    if (Array.isArray(payload)) {
      return payload;
    }

    if (payload && Array.isArray(payload.students)) {
      return payload.students;
    }

    if (payload && Array.isArray(payload.data)) {
      return payload.data;
    }

    return [];
  });
}
