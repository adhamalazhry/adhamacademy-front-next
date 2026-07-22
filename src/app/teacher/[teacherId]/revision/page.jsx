"use client";

import { use } from "react";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teachers/teacher-portal/TeacherSkeleton";
import { useTeacherPortalData } from "@/hooks/useTeacherPortalData";

export default function TeacherRevisionPage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useTeacherPortalData(teacherId);

  if (isLoading) return <TeacherSkeleton rows={5} />;
  if (error || !data) return <p className="text-sm text-red-600">تعذر تحميل صفحة الحفظ والمراجعة.</p>;

  return (
    <section className="space-y-5" dir="rtl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">الحفظ والمراجعة</h1>
        <p className="mt-1 text-sm text-slate-600">متابعة تقدم كل طالب في الحفظ الجديد وخطة المراجعة.</p>
      </header>

      <TeacherSectionCard title="متابعة الطلاب">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="px-3 py-2">الطالب</th>
                <th className="px-3 py-2">آخر محفوظ</th>
                <th className="px-3 py-2">آخر مراجعة</th>
                <th className="px-3 py-2">المقدار الجديد</th>
                <th className="px-3 py-2">المراجعة القادمة</th>
                <th className="px-3 py-2">نسبة الإنجاز</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student, index) => (
                <tr key={student.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 font-semibold text-slate-900">{student.name}</td>
                  <td className="px-3 py-2 text-slate-600">سورة الملك - آية {index + 5}</td>
                  <td className="px-3 py-2 text-slate-600">سورة يس - آية {index + 12}</td>
                  <td className="px-3 py-2 text-slate-600">5 آيات</td>
                  <td className="px-3 py-2 text-slate-600">غدًا</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {70 + (index % 20)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TeacherSectionCard>
    </section>
  );
}