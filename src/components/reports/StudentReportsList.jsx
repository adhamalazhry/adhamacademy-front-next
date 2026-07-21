"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSWRConfig } from "swr";
import Toast from "@/components/ui/Toast";
import { deleteReport } from "@/services/report.service";

function getReportDuration(report) {
  const candidate =
    report?.lessonDuration ??
    report?.durationMinutes ??
    report?.student?.lessonDuration ??
    report?.student?.subscription?.lessonDuration ??
    report?.student?.subscription?.durationMinutes;

  return candidate ? `${candidate} دقيقة` : "غير متاح";
}

function getQuickSummary(report) {
  const summaryText =
    report?.generalNotes ||
    report?.studentNotes ||
    report?.parentNotes ||
    report?.notes ||
    "لا يوجد ملخص مكتوب";

  return String(summaryText).slice(0, 120);
}

function buildReportPath(routeVariant, teacherId, studentId, reportId, mode = "details") {
  const basePrefix = routeVariant === "teachers" ? "/teachers" : "/teacher";
  const detailsPath = `${basePrefix}/${teacherId}/students/${studentId}/reports/${reportId}`;

  return mode === "edit" ? `${detailsPath}/edit` : detailsPath;
}

export default function StudentReportsList({
  reports = [],
  showHeader = true,
  teacherId,
  studentId,
  reportsKey,
  routeVariant = "teacher",
}) {
  const { mutate } = useSWRConfig();
  const [deleteId, setDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const canManage = Boolean(teacherId && studentId);

  const normalizedReports = useMemo(() => {
    return Array.isArray(reports) ? reports : [];
  }, [reports]);

  async function handleDelete(report) {
    if (!report?.id) return;

    const confirmed = window.confirm("هل أنت متأكد من حذف هذا التقرير؟");
    if (!confirmed) return;

    setDeleteId(report.id);

    try {
      await deleteReport(report.id);

      if (reportsKey) {
        await mutate(reportsKey);
      }

      setToastMessage("تم حذف التقرير بنجاح");
    } catch {
      setToastMessage("تعذر حذف التقرير. حاول مرة أخرى");
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div dir="rtl" className="text-gray-800">
      <Toast
        open={Boolean(toastMessage)}
        title="تنبيه"
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      {showHeader ? (
        <div className="mb-8">
          <h1 className="text-2xl font-bold">تقارير الحصص</h1>

          <p className="mt-1 text-sm text-gray-500">
            متابعة الحفظ والمراجعة والواجبات الخاصة بالطالب
          </p>
        </div>
      ) : null}

      {reports?.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
          لا توجد تقارير لهذا الطالب حتى الآن
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-right text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
                  <th className="px-4 py-3">تاريخ الحصة</th>
                  <th className="px-4 py-3">الطالب</th>
                  <th className="px-4 py-3">المعلم</th>
                  <th className="px-4 py-3">المدة</th>
                  <th className="px-4 py-3">ملخص سريع</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {normalizedReports.map((report) => {
                  const studentName = report?.student?.name || report?.studentName || "طالب غير محدد";
                  const teacherName = report?.teacher?.name || report?.teacherName || "معلم غير محدد";

                  return (
                    <tr key={report.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                      <td className="px-4 py-4 font-semibold text-slate-900">{String(report.lessonDate || "-").slice(0, 10)}</td>
                      <td className="px-4 py-4 text-slate-700">{studentName}</td>
                      <td className="px-4 py-4 text-slate-700">{teacherName}</td>
                      <td className="px-4 py-4 text-slate-700">{getReportDuration(report)}</td>
                      <td className="px-4 py-4 text-slate-600">{getQuickSummary(report)}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {canManage ? (
                            <>
                              <Link
                                href={buildReportPath(routeVariant, teacherId, studentId, report.id, "details")}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                عرض
                              </Link>

                              <Link
                                href={buildReportPath(routeVariant, teacherId, studentId, report.id, "edit")}
                                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                              >
                                تعديل
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleDelete(report)}
                                disabled={deleteId === report.id}
                                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {deleteId === report.id ? "جار الحذف..." : "حذف"}
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-500">عرض فقط</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}