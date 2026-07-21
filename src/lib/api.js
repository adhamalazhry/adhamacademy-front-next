// src/lib/api.js

const API_BASE_PATH = "/api";

export async function api(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_PATH}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "حدث خطأ أثناء الاتصال بالسيرفر";

    try {
      const errorData = await response.json();

      if (typeof errorData?.message === "string") {
        message = errorData.message;
      }
    } catch {
      // Keep default message when response body is not JSON.
    }

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}