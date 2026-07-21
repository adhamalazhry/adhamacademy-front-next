import DashboardShell from "@/components/layout/DashboardShell";
import { getTeacherLinks } from "@/components/config/sidebar/teacher";
import { teacherAccountPath } from "@/lib/routes/teacher";

export default async function TeacherPortalLayout({ children, params }) {
  const { teacherId } = await params;

  return (
    <DashboardShell
      title="لوحة المعلم"
      subtitle="بوابة المعلم"
      logo="/logo.png"
      links={getTeacherLinks(teacherId)}
      userName="المعلم"
      profileHref={teacherAccountPath(teacherId)}
      notifications={2}
      messages={1}
      helpBox={{
        icon: "📚",
        title: "مركز المعلم",
        description: "تابع طلابك، أنشئ التقارير، وأدر الواجبات بسهولة.",
      }}
    >
      {children}
    </DashboardShell>
  );
}