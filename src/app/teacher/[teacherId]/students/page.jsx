"use client";

import Link from "next/link";
import { use } from "react";
import useSWR from "swr";
import TeacherSkeleton from "@/components/teacher-portal/TeacherSkeleton";
import { getTeacherStudents } from "@/services/teacher.service";
import { teacherStudentPath } from "@/lib/routes/teacher";

export default function TeacherStudentsPage({ params }) {
  const { teacherId } = use(params);

  const { data: students = [], error, isLoading } = useSWR(
    teacherId ? ["teacher-students", teacherId] : null,
    () => getTeacherStudents(teacherId),
  );

  if (isLoading) {
    return <TeacherSkeleton rows={5} />;
  }

  if (error) {
    return <p className="text-sm text-red-600">تعذر تحميل طلاب المعلم.</p>;
  }

  return (
    <section className="space-y-5" dir="rtl">
      <header className="space-y-2">
        
        <h1 className="text-2xl font-bold text-slate-900">طلابي</h1>
       
      </header>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-3">الطالب</th>
               
                <th className="px-4 py-3">العمر</th>
                <th className="px-4 py-3">المستوى</th>
               
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">لا يوجد طلاب مرتبطون بهذا المعلم حاليًا.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70">
                    <td className="px-4 py-4 font-semibold text-slate-900">{student.name}</td>
                    
                    <td className="px-4 py-4 text-slate-600">{student.age || "-"}</td>
                    <td className="px-4 py-4 text-slate-600">{student.level || "متوسط"}</td>
                   
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link href={teacherStudentPath(teacherId, student.id)} className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">فتح الطالب</Link>
                        <Link href={teacherStudentPath(teacherId, student.id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">تفاصيل</Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">إجمالي الطلاب: {students.length}</p>
    </section>
  );
}