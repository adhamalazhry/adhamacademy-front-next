"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import LessonReportForm from "@/components/reports/lesson-report/LessonReportForm";
import Toast from "@/components/ui/Toast";
import { teacherStudentReportsPath } from "@/lib/routes/teacher";
import { getReport, updateReport } from "@/services/reprts/report.service";
import { getTeacher } from "@/services/teachers/teacher.service";
import { getTeacherStudent } from "@/services/students/student.service";

function mapReportToFormDefaults(report) {
  const mapSection = (items) =>
    Array.isArray(items)
      ? items.map((item) => ({
          surah: item?.surah || "",
          surahNumber: Number(item?.surahNumber || 0),
          fromAyah: String(item?.fromAyah || "1"),
          toAyah: String(item?.toAyah || "1"),
          evaluation: item?.evaluation || "",
          notes: item?.notes || "",
        }))
      : [];

  const mapHomeworkSection = (items) =>
    Array.isArray(items)
      ? items.map((item) => ({
          surah: item?.surah || "",
          surahNumber: Number(item?.surahNumber || 0),
          fromAyah: String(item?.fromAyah || "1"),
          toAyah: String(item?.toAyah || "1"),
        }))
      : [];

  return {
    lessonDate: String(report?.lessonDate || "").slice(0, 10),
    generalNotes: report?.generalNotes || "",
    memorization: mapSection(report?.memorization),
    nearReview: mapSection(report?.nearReview),
    distantReview: mapSection(report?.distantReview),
    tajweedPoints: Array.isArray(report?.tajweedPoints)
      ? report.tajweedPoints.map((item) => ({
          title: item?.title || "",
          notes: item?.notes || "",
        }))
      : [],
    nextLessonMemorization: mapHomeworkSection(report?.nextLessonMemorization),
    nextLessonNearReview: mapHomeworkSection(report?.nextLessonNearReview),
    nextLessonDistantReview: mapHomeworkSection(report?.nextLessonDistantReview),
    studentNotes: report?.studentNotes || "",
    parentNotes: report?.parentNotes || "",
  };
}

export default function TeacherStudentReportEditPage({ params }) {
  const { teacherId, studentId, reportId } = use(params);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [toastMessage, setToastMessage] = useState("");

  const { data: report, isLoading: reportLoading, error: reportError } = useSWR(
    reportId ? ["report-edit", reportId] : null,
    () => getReport(reportId),
  );

  const { data: student, isLoading: studentLoading } = useSWR(
    teacherId && studentId ? ["teacher-student-report-edit", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  const { data: teacher, isLoading: teacherLoading } = useSWR(
    teacherId ? ["teacher-report-edit", teacherId] : null,
    () => getTeacher(teacherId),
  );

  if (reportLoading || studentLoading || teacherLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل التقرير للتعديل...</p>;
  }

  if (reportError || !report) {
    return <p className="p-6 text-red-600">تعذر تحميل التقرير المطلوب</p>;
  }

  async function handleUpdate(payload) {
    await updateReport(reportId, payload);
    await Promise.all([
      mutate(["student-reports", teacherId || "standalone", studentId]),
      mutate(["report-details", reportId]),
      mutate(["report-edit", reportId]),
    ]);
    setToastMessage("تم تحديث التقرير بنجاح");
    router.push(`${teacherStudentReportsPath(teacherId, studentId)}?reportSaved=1`);
  }

  return (
    <div dir="rtl" className="space-y-6 p-6">
      <Toast
        open={Boolean(toastMessage)}
        title="نجاح"
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <LessonReportForm
        student={student}
        teacher={teacher}
        studentId={studentId}
        teacherId={teacherId}
        reportsKey={["student-reports", teacherId || "standalone", studentId]}
        backHref={teacherStudentReportsPath(teacherId, studentId)}
        initialValues={mapReportToFormDefaults(report)}
        submitLabel="تحديث التقرير"
        successText="تم تحديث تقرير الحصة بنجاح"
        onSubmitReport={handleUpdate}
      />
    </div>
  );
}
