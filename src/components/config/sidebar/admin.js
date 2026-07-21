export const adminLinks = () => [
  {
    title: "لوحة المشرف",
    href: "/admin/dashboard",
    icon: "🏠",
  },
  {
    title: "إدارة الطلاب",
    href: "/admin/students",
    icon: "🎓",
  },
  {
    title: "إدارة المعلمين",
    href: "/admin/teachers",
    icon: "👨‍🏫",
  },
  {
    title: "إدارة الاشتراكات",
    href: "/admin/subscriptions",
    icon: "💳",
  },
  {
    title: "المدفوعات",
    href: "/admin/payments",
    icon: "💰",
  },
  {
    title: "الجداول",
    href: "/admin/schedules",
    icon: "📅",
  },
  {
    title: "التقارير",
    href: "/admin/reports",
    icon: "📊",
  },
  {
    title: "إضافة طالب",
    href: "/admin/students/new",
    icon: "➕🎓",
  },
  {
    title: "إضافة معلم",
    href: "/admin/teachers/new",
    icon: "➕👨‍🏫",
  },
];

export const getAdminLinks = () => adminLinks();