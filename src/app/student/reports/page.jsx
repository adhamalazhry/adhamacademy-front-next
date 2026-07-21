import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session-server";

export default async function StudentReportsPage() {
  const session = await getServerSession();
  const studentId = session.userId || "1";

  redirect(`/students/${studentId}/reports`);
}
