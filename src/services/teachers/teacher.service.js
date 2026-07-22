import { api } from "@/lib/api";

function buildTeacherPayload(data = {}) {
  const payload = { ...data };

  if ("hourlyRate" in payload) {
    const hourlyRate = Number(payload.hourlyRate);

    if (
      payload.hourlyRate === "" ||
      payload.hourlyRate === null ||
      payload.hourlyRate === undefined ||
      Number.isNaN(hourlyRate)
    ) {
      delete payload.hourlyRate;
    } else {
      payload.hourlyRate = hourlyRate;
    }
  }

  if ("currency" in payload) {
    const normalizedCurrency = String(payload.currency || "")
      .trim()
      .toUpperCase();

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

function normalizeTeacher(teacher) {
  if (!teacher) return teacher;

  return {
    ...teacher,
    hourlyRate: Number(teacher.hourlyRate ?? teacher.hourly_rate ?? 0),
  };
}

function normalizeTeachersList(response) {
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

function normalizeTeacherResponse(response) {
  return normalizeTeacher(unwrapResponse(response));
}

/* ===========================
   Teacher CRUD
=========================== */

export function getTeachers() {
  return api("/teachers").then(normalizeTeachersList);
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