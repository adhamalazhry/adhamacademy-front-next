import { NextResponse } from "next/server";
import { ROLE_HOME, ROLES } from "./src/lib/auth/roles";

const PUBLIC_PATHS = ["/", "/auth/select-role"];

function isPublicPath(pathname) {
  return PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.startsWith("/favicon");
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const role = request.cookies.get("role")?.value;
  const userId = request.cookies.get("userId")?.value || "";

  if (!role) {
    return NextResponse.redirect(new URL("/auth/select-role", request.url));
  }

  if (role === ROLES.ADMIN) {
    return NextResponse.next();
  }

  if (role === ROLES.TEACHER) {
    const canAccessTeacherPortal = pathname.startsWith("/teacher") || pathname.startsWith(`/teachers/${userId}`);

    if (!canAccessTeacherPortal) {
      return NextResponse.redirect(new URL(ROLE_HOME[ROLES.TEACHER], request.url));
    }

    return NextResponse.next();
  }

  if (role === ROLES.STUDENT) {
    const canAccessStudentPortal = pathname.startsWith("/student") || pathname.startsWith(`/students/${userId}`);

    if (!canAccessStudentPortal) {
      return NextResponse.redirect(new URL(ROLE_HOME[ROLES.STUDENT], request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/select-role", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
