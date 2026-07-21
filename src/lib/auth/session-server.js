import { cookies } from "next/headers";
import { ROLE_HOME, ROLES, isValidRole } from "./roles";

export async function getServerSession() {
  const store = await cookies();
  const role = store.get("role")?.value;
  const userId = store.get("userId")?.value || "";

  return {
    role: isValidRole(role) ? role : null,
    userId,
  };
}

export function resolveHomeByRole(role, userId = "") {
  if (role === ROLES.TEACHER && userId) {
    return `/teacher/${userId}/dashboard`;
  }

  return ROLE_HOME[role] || "/auth/select-role";
}

export function canAccessPath({ role, path, userId }) {
  if (!role) return true;

  if (role === ROLES.ADMIN) {
    return true;
  }

  if (role === ROLES.TEACHER) {
    return path.startsWith("/teacher") || path.startsWith(`/teachers/${userId}`);
  }

  if (role === ROLES.STUDENT) {
    return path.startsWith("/student") || path.startsWith(`/students/${userId}`);
  }

  return false;
}
