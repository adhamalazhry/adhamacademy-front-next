"use client";

import { use } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getTeacherStudent } from "@/services/students/student.service";
import {
  teacherStudentHomeworkPath,
  teacherStudentProfilePath,
  teacherStudentProgressPath,
  teacherStudentReportNewPath,
  teacherStudentReportsPath,
  teacherStudentRevisionPath,
  teacherStudentSchedulePath,
  teacherStudentSubscriptionPath,
} from "@/lib/routes/teacher";

export default function TeacherStudentPage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, isLoading, error } = useSWR(
    teacherId && studentId ? ["teacher-student", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  if (isLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل بيانات الطالب...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات الطالب</p>;
  }

  if (!student) {
    return <p className="p-6 text-slate-600">الطالب غير موجود</p>;
  }

  const quickLinks = [
    {
      href: teacherStudentProfilePath(teacherId, studentId),
      title: "الملف الشخصي",
      description: "عرض بيانات الطالب الأساسية",
      accent: "bg-blue-600 hover:bg-blue-700",
    },
    {
      href: teacherStudentReportsPath(teacherId, studentId),
      title: "تقارير الطالب",
      description: "عرض جميع تقارير الطالب",
      accent: "bg-slate-900 hover:bg-slate-800",
    },
    {
      href: teacherStudentReportNewPath(teacherId, studentId),
      title: "تقرير جديد",
      description: "إضافة تقرير حصة جديد",
      accent: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      href: teacherStudentRevisionPath(teacherId, studentId),
      title: "الحفظ والمراجعة",
      description: "متابعة الخطة التعليمية",
      accent: "bg-amber-600 hover:bg-amber-700",
    },
    {
      href: teacherStudentHomeworkPath(teacherId, studentId),
      title: "الواجبات",
      description: "متابعة الواجبات المستقبلية",
      accent: "bg-violet-600 hover:bg-violet-700",
    },
    {
      href: teacherStudentProgressPath(teacherId, studentId),
      title: "التقدم والإحصائيات",
      description: "ملخص التقدم ومستوى الإنجاز",
      accent: "bg-fuchsia-600 hover:bg-fuchsia-700",
    },
    
    {
      href: teacherStudentSchedulePath(teacherId, studentId),
      title: "جدول الطالب",
      description: "مواعيد الحصص القادمة",
      accent: "bg-cyan-600 hover:bg-cyan-700",
    },
  ];

  return (
    <section className="space-y-5" dir="rtl">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">ملف الطالب</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{student.name}</h1>
        <p className="mt-2 text-sm text-slate-600">اختر القسم المناسب لإدارة بيانات الطالب    .</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className={`rounded-2xl p-6 text-white shadow-lg transition hover:-translate-y-1 ${item.accent}`}>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-white/90">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}