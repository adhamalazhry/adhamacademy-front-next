import DashboardShell from "@/components/layout/DashboardShell";
import { studentLinks } from "@/components/config/sidebar/student";

export default function StudentPortalLayout({ children }) {
  return (
    <DashboardShell
      title="لوحة الطالب"
      subtitle="بوابة الطالب"
      logo="/logo.png"
      links={studentLinks}
      userName="الطالب"
      profileHref="/student/profile"
      notifications={4}
      messages={0}
      helpBox={{
        icon: "🎓",
        title: "رحلة الطالب",
        description: "تابع تقدمك والتقارير والواجبات من مكان واحد.",
      }}
    >
      {children}
    </DashboardShell>
  );
}
