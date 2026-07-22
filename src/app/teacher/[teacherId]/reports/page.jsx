"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import TeacherSectionCard from "@/components/teachers/teacher-portal/TeacherSectionCard";
import TeacherSkeleton from "@/components/teachers/teacher-portal/TeacherSkeleton";
import {
  teacherStudentReportDetailsPath,
  teacherStudentReportEditPath,
} from "@/lib/routes/teacher";
import { getTeacherReports } from "@/services/reprts/report.service";

export default function TeacherReportsPage({ params }) {
  const { teacherId } = use(params);

  const { data, isLoading, error } = useSWR(
    teacherId ? ["teacher-reports", teacherId] : null,
    () => getTeacherReports(teacherId),
  );

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredReports = useMemo(() => {
    const reports = Array.isArray(data) ? data : [];
    return reports.filter((report) => {
      const searchText = [report.student?.name, report.teacher?.name, report.generalNotes, report.studentNotes, report.parentNotes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !search || searchText.includes(search.toLowerCase());

      const reportDate = report.lessonDate ? String(report.lessonDate).slice(0, 10) : "";
      const matchesFrom = !fromDate || (reportDate && reportDate >= fromDate);
      const matchesTo = !toDate || (reportDate && reportDate <= toDate);

      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [data, search, fromDate, toDate]);

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort(
      (a, b) => new Date(b.lessonDate || 0) - new Date(a.lessonDate || 0),
    );
  }, [filteredReports]);

  if (isLoading) return <TeacherSkeleton rows={6} />;
  if (error) return <p className="text-sm text-red-600">تعذر تحميل تقارير المعلم.</p>;

  function handlePrint() {
    window.print();
  }

  return (
    <section className="space-y-5" dir="rtl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">تقارير الطلاب</h1>
          <p className="mt-1 text-sm text-slate-600">بحث وفلترة وتحديث تقارير الطلاب مع خيار الطباعة.</p>
        </div>
        <Button type="button" onClick={handlePrint}>طباعة PDF</Button>
      </header>

      <TeacherSectionCard title="أدوات البحث والفلترة">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث باسم الطالب أو الملاحظات" />
          <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSearch("");
              setFromDate("");
              setToDate("");
            }}
          >
            إعادة تعيين
          </Button>
        </div>
      </TeacherSectionCard>

      <TeacherSectionCard title="كل التقارير" description={`إجمالي النتائج: ${sortedReports.length}`}>
        {sortedReports.length === 0 ? (
          <p className="text-sm text-slate-500">لا توجد تقارير مطابقة للبحث الحالي.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="px-3 py-2">الطالب</th>
                  <th className="px-3 py-2">التاريخ</th>
                  <th className="px-3 py-2">الملاحظات العامة</th>
                  <th className="px-3 py-2">ملاحظات الطالب</th>
                  <th className="px-3 py-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {sortedReports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-900">{report.student?.name || report.studentName || "-"}</td>
                    <td className="px-3 py-2 text-slate-600">{report.lessonDate || "-"}</td>
                    <td className="px-3 py-2 text-slate-600">{report.generalNotes || "-"}</td>
                    <td className="px-3 py-2 text-slate-600">{report.studentNotes || "-"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Link
                          href={teacherStudentReportDetailsPath(
                            teacherId,
                            report.studentId,
                            report.id,
                          )}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          عرض
                        </Link>
                        <Link
                          href={teacherStudentReportEditPath(
                            teacherId,
                            report.studentId,
                            report.id,
                          )}
                          className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          تعديل
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TeacherSectionCard>
    </section>
  );
}