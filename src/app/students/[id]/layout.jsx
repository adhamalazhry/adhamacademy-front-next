"use client";

import { use } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getStudentLinks } from "@/components/config/sidebar/student";

export default function StudentLayout({ children, params }) {
  const { id } = use(params);

  return (
    <DashboardShell
      title="لوحة الطالب"
      subtitle="بوابة الطالب"
      logo="/logo.png"
      links={getStudentLinks(id)}
      userName="محمد أحمد"
      profileHref={`/students/${id}/profile`}
      notifications={5}
      messages={2}
      helpBox={{
        icon: "🎓",
        title: "مركز الطالب",
        description: "واصل متابعة جدولك واشتراكاتك وتقاريرك بسهولة.",
      }}
    >
      {children}
    </DashboardShell>
  );
}
