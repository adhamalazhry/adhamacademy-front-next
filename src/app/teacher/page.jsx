import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session-server";
import { resolveHomeByRole } from "@/lib/auth/session-server";

export default async function TeacherRootPage() {
  const session = await getServerSession();

  redirect(resolveHomeByRole(session.role, session.userId));
}
