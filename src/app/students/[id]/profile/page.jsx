"use client";

import { use } from "react";
import useSWR from "swr";

import StudentProfileCard from "@/components/Students/studentPrpfile/StudentProfileCard";
import StudentInfo from "@/components/Students/StudentInfo";
import { getStudent } from "@/services/students/student.service";

export default function ProfilePage({ params }) {
  const { id } = use(params);

  const { data: student, error, isLoading } = useSWR(
    id ? ["student", id] : null,
    () => getStudent(id)
  );

  if (isLoading)
    return <p className="p-6 text-slate-600">جاري تحميل بيانات الطالب...</p>;

  if (error)
    return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل بيانات الطالب</p>;

  if (!student)
    return <p className="p-6 text-slate-600">الطالب غير موجود</p>;

  return (
    <div className="space-y-6 p-6">
      <StudentProfileCard student={student} />
      <StudentInfo student={student} />
    </div>
  );
}
