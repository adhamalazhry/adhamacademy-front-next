import { api } from "@/lib/api";

function buildSubscriptionPayload(data = {}) {
  const payload = {};

  if (data.subscriptionFee !== undefined) {
    payload.subscriptionFee = Number(data.subscriptionFee);
  }

  if (data.currency !== undefined) {
    payload.currency = String(data.currency).trim();
  }

  if (data.monthlySessions !== undefined) {
    payload.monthlySessions = Number(data.monthlySessions);
  }

  if (data.sessionDuration !== undefined) {
    payload.sessionDuration = Number(data.sessionDuration);
  }

  return payload;
}

export function createStudentSubscription(studentId, data) {
  return api(`/students/${studentId}/subscription`, {
    method: "POST",
    body: JSON.stringify(buildSubscriptionPayload(data)),
  });
}

export async function getStudentSubscription(studentId) {
  try {
    return await api(`/students/${studentId}/subscription`);
  } catch (error) {
    if (error?.status === 404) {
      return null;
    }

    throw error;
  }
}

export function getSubscriptionById(subscriptionId) {
  return api(`/subscriptions/${subscriptionId}`);
}

export function updateStudentSubscription(subscriptionId, data) {
  return api(`/subscriptions/${subscriptionId}`, {
    method: "PATCH",
    body: JSON.stringify(buildSubscriptionPayload(data)),
  });
}

export function deleteStudentSubscription(subscriptionId) {
  return api(`/subscriptions/${subscriptionId}`, {
    method: "DELETE",
  });
}
