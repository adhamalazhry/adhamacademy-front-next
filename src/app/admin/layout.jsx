"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { adminLinks } from "@/components/config/sidebar/admin";

export default function AdminLayout({ children }) {
  return (
    <DashboardShell
      title="لوحة المشرف"
      subtitle="بوابة المشرف"
      logo="/logo.png"
      links={adminLinks()}
      userName="المشرف"
      profileHref="/admin/dashboard"
      notifications={3}
      messages={1}
      helpBox={{
        icon: "💡",
        title: "دعم المستخدم",
        description: "يمكنك الوصول إلى إدارة الحساب والتقارير بسرعة.",
      }}
    >
      {children}
    </DashboardShell>
  );
}
