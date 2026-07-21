import { NextResponse } from "next/server";
import { isValidRole } from "@/lib/auth/roles";

export async function POST(request) {
  const body = await request.json();
  const role = body?.role;
  const userId = String(body?.userId || "").trim();

  if (!isValidRole(role)) {
    return NextResponse.json({ message: "invalid role" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("role", role, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  response.cookies.set("userId", userId, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete("role");
  response.cookies.delete("userId");

  return response;
}
