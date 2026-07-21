import {
  teacherAccountPath,
  teacherDashboardPath,
  teacherFinancialPath,
  teacherHomeworkPath,
  teacherNotificationsPath,
  teacherReportsPath,
  teacherRevisionPath,
  teacherSchedulePath,
  teacherStudentsPath,
} from "@/lib/routes/teacher";

export function getTeacherLinks(teacherId) {
  return [
    {
      title: "الرئيسية",
      href: teacherDashboardPath(teacherId),
      icon: "🏠",
    },
    {
      title: "طلابي",
      href: teacherStudentsPath(teacherId),
      icon: "👨‍🎓",
    },
    {
      title: "جدول الحصص",
      href: teacherSchedulePath(teacherId),
      icon: "📅",
    },
    {
      title: "التقارير",
      href: teacherReportsPath(teacherId),
      icon: "📊",
    },
    {
      title: "الحفظ والمراجعة",
      href: teacherRevisionPath(teacherId),
      icon: "📖",
    },
    {
      title: "الواجبات",
      href: teacherHomeworkPath(teacherId),
      icon: "📝",
    },
    {
      title: "المالية",
      href: teacherFinancialPath(teacherId),
      icon: "💵",
    },
    {
      title: "حسابي",
      href: teacherAccountPath(teacherId),
      icon: "👤",
    },
    {
      title: "الإشعارات",
      href: teacherNotificationsPath(teacherId),
      icon: "🔔",
    },
  ];
}