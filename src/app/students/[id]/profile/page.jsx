"use client";

import { use } from "react";
import useSWR from "swr";
import StudentProfileCard from "@/components/students/StudentProfileCard";

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
    <div className="flex min-h-[80vh] items-center justify-center">
      <StudentProfileCard student={student} />
    </div>
  );
}