import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session-server";

export default async function StudentHomeworkPage() {
  const session = await getServerSession();
  const studentId = session.userId || "1";

  redirect(`/students/${studentId}/homework`);
}
