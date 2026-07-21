export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
};

export const ROLE_HOME = {
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.TEACHER]: "/teacher",
  [ROLES.STUDENT]: "/student/dashboard",
};

export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}
