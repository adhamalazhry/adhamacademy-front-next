import { redirect } from "next/navigation";
import { teacherDashboardPath } from "@/lib/routes/teacher";

export default async function TeacherHomePage({ params }) {
  const { teacherId } = await params;

  redirect(teacherDashboardPath(teacherId));
}