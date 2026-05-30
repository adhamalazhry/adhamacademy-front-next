"use client";

import { use } from "react";
import useSWR from "swr";

import StudentData from "@/components/Students/studentPrpfile/StudentData";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProfilePage({ params }) {
  const { id } = use(params);

  const { data: student, error, isLoading } = useSWR(
    `http://localhost:3001/students/${id}`,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <>
      <StudentData student={student}/>
     
    </>
  );
}