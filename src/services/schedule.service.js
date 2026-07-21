import { api } from "@/lib/api";

export function getTeacherSchedule(teacherId, view = "week") {
	return api(`/teachers/${teacherId}/schedule?view=${view}`);
}

export function startSession(sessionId) {
	return api(`/sessions/${sessionId}/start`, {
		method: "POST",
	});
}

export function completeSession(sessionId) {
	return api(`/sessions/${sessionId}/complete`, {
		method: "POST",
	});
}
