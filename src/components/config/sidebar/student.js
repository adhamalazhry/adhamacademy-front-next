export const studentLinks = [
  {
    title: "لوحة الطالب",
    href: "/student/dashboard",
    icon: "🏠",
  },
  {
    title: "الملف الشخصي",
    href: "/student/profile",
    icon: "👤",
  },
  {
    title: "جدول الحصص",
    href: "/student/schedule",
    icon: "📅",
  },
  {
    title: "تقارير الحصص",
    href: "/student/reports",
    icon: "📊",
  },
  {
    title: "الاشتراكات",
    href: "/student/subscription",
    icon: "💳",
  },
  {
    title: "الواجبات",
    href: "/student/homework",
    icon: "📝",
  },
  {
    title: "الإشعارات",
    href: "/student/notifications",
    icon: "🔔",
  },
];

export function getStudentLinks(studentId) {
  if (!studentId) {
    return studentLinks;
  }

  return [
    {
      title: "لوحة الطالب",
      href: `/students/${studentId}`,
      icon: "🏠",
    },
    {
      title: "الملف الشخصي",
      href: `/students/${studentId}/profile`,
      icon: "👤",
    },
    {
      title: "جدول الحصص",
      href: `/students/${studentId}/schedule`,
      icon: "📅",
    },
    {
      title: "تقارير الحصص",
      href: `/students/${studentId}/reports`,
      icon: "📊",
    },
    {
      title: "الواجبات",
      href: `/students/${studentId}/homework`,
      icon: "📝",
    },
  ];
}