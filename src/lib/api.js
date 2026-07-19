// src/lib/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("حدث خطأ أثناء الاتصال بالسيرفر");
  }

  return response.json();
}