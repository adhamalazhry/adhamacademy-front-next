"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import StudentReportsList from "@/components/reports/StudentReportsList";
import Toast from "@/components/ui/Toast";
import { getTeacherStudent, getStudent } from "@/services/students/student.service";
import { getTeacher } from "@/services/teachers/teacher.service";
import { getStudentReports, getTeacherStudentReports } from "@/services/reprts/report.service";
import LessonHeader from "./LessonHeader";
import LessonInfoCard from "./LessonInfoCard";
import { resolveLessonDuration, resolveTeacherName } from "./lesson-report-utils";

export default function LessonReportsWorkspace({
  studentId,
  teacherId,
  createHref,
  routeVariant = "teacher",
}) {
  const searchParams = useSearchParams();
  const [toastMessage, setToastMessage] = useState("");

  const {
    data: student,
    isLoading: studentLoading,
    error: studentError,
  } = useSWR(studentId ? ["lesson-report-student", teacherId || "standalone", studentId] : null, () =>
    teacherId ? getTeacherStudent(teacherId, studentId) : getStudent(studentId),
  );

  const {
    data: teacher,
    isLoading: teacherLoading,
    error: teacherError,
  } = useSWR(teacherId ? ["lesson-report-teacher", teacherId] : null, () =>
    getTeacher(teacherId),
  );

  const {
    data: reports,
    isLoading: reportsLoading,
    error: reportsError,
  } = useSWR(studentId ? ["student-reports", teacherId || "standalone", studentId] : null, () =>
    teacherId ? getTeacherStudentReports(teacherId, studentId) : getStudentReports(studentId),
  );

  useEffect(() => {
    if (searchParams.get("reportSaved") === "1") {
      setToastMessage("تم حفظ التقرير بنجاح وتم تحديث القائمة");
    }
  }, [searchParams]);

  if (studentLoading || teacherLoading || reportsLoading) {
    return <p className="p-6 text-slate-600">جاري تحميل التقارير...</p>;
  }

  if (studentError || teacherError || reportsError) {
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات التقارير</p>;
  }

  const lessonDuration = resolveLessonDuration(student);
  const teacherName = resolveTeacherName(student, teacher);

  return (
    <div dir="rtl" className="space-y-6 p-4 md:p-6">
      <Toast
        open={Boolean(toastMessage)}
        title="نجاح"
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <LessonHeader
        title="تقارير الحصص"
        description="متابعة الحفظ والمراجعة والواجبات الخاصة بالطالب"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <LessonInfoCard label="اسم الطالب" value={student?.name || "غير محدد"} />
        <LessonInfoCard label="اسم المعلم" value={teacherName} />
        <LessonInfoCard
          label="مدة الحصة"
          value={lessonDuration ? `${lessonDuration} دقيقة` : "غير متاح"}
        />
      </div>

      {createHref ? (
        <div className="flex justify-end">
          <Link
            href={createHref}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            إضافة تقرير جديد
          </Link>
        </div>
      ) : null}

      <StudentReportsList
        reports={reports}
        showHeader={false}
        teacherId={teacherId}
        studentId={studentId}
        reportsKey={["student-reports", teacherId || "standalone", studentId]}
        routeVariant={routeVariant}
      />
    </div>
  );
}
