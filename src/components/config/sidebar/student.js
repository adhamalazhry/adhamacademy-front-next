export const getStudentLinks = (id) => [
  {
    title: "الصفحة الرئيسية",
    href: `/students/${id}`,
    icon: "🏠",
  },
  {
    title: "الملف الشخصي",
    href: `/students/${id}/profile`,
    icon: "👤",
  },
  {
    title: "جدول الحصص",
    href: `/students/${id}/schedule`,
    icon: "📅",
  },
  {
    title: "تقارير الحصص",
    href: `/students/${id}/reports`,
    icon: "📊",
  },
  {
    title: "الاشتراكات",
    href: `/students/${id}/payments`,
    icon: "💳",
  },
  {
    title: "الرسائل",
    href: `/students/${id}/messages`,
    icon: "💬",
    badge: 3,
  },
  {
    title: "الإشعارات",
    href: `/students/${id}/notifications`,
    icon: "🔔",
    badge: 5,
  },
  {
    title: "الإعدادات",
    href: `/students/${id}/settings`,
    icon: "⚙️",
  },
  
];