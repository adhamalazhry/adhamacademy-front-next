"use client";

import { use } from "react";
import useSWR from "swr";
import StudentProfileCard from "@/components/Students/studentPrpfile/StudentProfileCard";
import StudentInfo from "@/components/Students/StudentInfo";
import { getTeacherStudent } from "@/services/students/student.service";

export default function TeacherStudentProfilePage({ params }) {
  const { teacherId, studentId } = use(params);

  const { data: student, error, isLoading } = useSWR(
    teacherId && studentId ? ["teacher-student-profile", teacherId, studentId] : null,
    () => getTeacherStudent(teacherId, studentId),
  );

  if (isLoading) return <p className="p-6 text-slate-600">جاري تحميل الملف الشخصي...</p>;
  if (error) return <p className="p-6 text-red-600">تعذر تحميل الملف الشخصي.</p>;
  if (!student) return <p className="p-6 text-slate-600">الطالب غير موجود.</p>;

  return (
    <div className="space-y-6 p-1" dir="rtl">
      <StudentProfileCard student={student} />
      <StudentInfo student={student} />
    </div>
  );
}
