export const getTeacherLinks = (id) => [
  {
    title: "الرئيسية",
    href: `/teachers/${id}`,
    icon: "🏠",
  },
  {
    title: "طلابي",
    href: `/teachers/${id}/students`,
    icon: "👨‍🎓",
  },
  {
    title: "جدول الحصص",
    href: `/teachers/${id}/schedule`,
    icon: "📅",
  },
  {
    title: "التقارير",
    href: `/teachers/${id}/reports`,
    icon: "📊",
  },
];