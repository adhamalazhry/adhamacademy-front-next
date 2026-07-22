"use client";

import Link from "next/link";
import { use } from "react";
import useSWR from "swr";
import { getTeacherStudent } from "@/services/students/student.service";
import {
  teacherStudentHomeworkPath,
  teacherStudentPath,
  teacherStudentProfilePath,
  teacherStudentProgressPath,
  teacherStudentReportsPath,
  teacherStudentRevisionPath,
  teacherStudentSchedulePath,
  teacherStudentSubscriptionPath,
} from "@/lib/routes/teacher";

export default function TeacherStudentLayout({ children, params }) {
  const { teacherId, studentId } = use(params);

  const {
    data: student,
    isLoading,
    error,
  } = useSWR(
    teacherId && studentId
      ? ["teacher-student-layout", teacherId, studentId]
      : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const links = [
    { title: "الرئيسية", href: teacherStudentPath(teacherId, studentId) },
    {
      title: "الملف الشخصي",
      href: teacherStudentProfilePath(teacherId, studentId),
    },
    {
      title: "التقارير",
      href: teacherStudentReportsPath(teacherId, studentId),
    },
    {
      title: "الحفظ والمراجعة",
      href: teacherStudentRevisionPath(teacherId, studentId),
    },
    {
      title: "الواجبات",
      href: teacherStudentHomeworkPath(teacherId, studentId),
    },
    { title: "التقدم", href: teacherStudentProgressPath(teacherId, studentId) },

    { title: "الجدول", href: teacherStudentSchedulePath(teacherId, studentId) },
  ];

  return (
    <section className="space-y-5" dir="rtl">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">مساحة الطالب داخل بوابة المعلم</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {isLoading ? "جاري تحميل اسم الطالب..." : student?.name || "الطالب"}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      {children}
    </section>
  );
}
