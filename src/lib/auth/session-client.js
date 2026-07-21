export function getClientSession() {
  if (typeof document === "undefined") {
    return { role: null, userId: "" };
  }

  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean);

  const map = Object.fromEntries(
    cookies.map((cookie) => {
      const [key, ...rest] = cookie.split("=");
      return [key, decodeURIComponent(rest.join("="))];
    })
  );

  return {
    role: map.role || null,
    userId: map.userId || "",
  };
}
