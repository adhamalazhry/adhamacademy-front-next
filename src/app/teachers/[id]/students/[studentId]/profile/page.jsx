"use client";

import { use } from "react";
import useSWR from "swr";

import StudentProfileCard from "@/components/Students/studentPrpfile/StudentProfileCard";
import StudentInfo from "@/components/Students/StudentInfo";
import { getStudent } from "@/services/student.service";

export default function ProfilePage({ params }) {
  const { studentId } = use(params);

  const {
    data: student,
    error,
    isLoading,
  } = useSWR(
    ["student", studentId],
    () => getStudent(studentId)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <>
      <StudentProfileCard student={student} />
      <StudentInfo student={student} />
    </>
  );
}