"use client";

import Link from "next/link";
import { use } from "react";
import useSWR from "swr";
import ReportCard from "@/components/reports/ReportCard";
import {
  teacherStudentReportEditPath,
  teacherStudentReportsPath,
} from "@/lib/routes/teacher";
import { getReport } from "@/services/report.service";

export default function TeacherStudentReportDetailsPage({ params }) {
  const { teacherId, studentId, reportId } = use(params);

  const { data: report, isLoading, error } = useSWR(
    reportId ? ["report-details", reportId] : null,
    () => getReport(reportId),
  );

  if (isLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل تفاصيل التقرير...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل التقرير</p>;
  }

  if (!report) {
    return <p className="p-6 text-slate-600">التقرير غير موجود</p>;
  }

  return (
    <section dir="rtl" className="space-y-5 p-4 md:p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
        <p className="text-xs font-bold tracking-[0.15em] text-slate-500">LESSON REPORT DETAILS</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">تفاصيل التقرير</h1>
        <p className="mt-2 text-sm text-slate-600">مراجعة شاملة لمحتوى الحصة والتقويم والواجب والملاحظات.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={teacherStudentReportEditPath(teacherId, studentId, reportId)}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            تعديل التقرير
          </Link>

          <Link
            href={teacherStudentReportsPath(teacherId, studentId)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            رجوع إلى قائمة التقارير
          </Link>
        </div>
      </div>

      <ReportCard report={report} />
    </section>
  );
}
