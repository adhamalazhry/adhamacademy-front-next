"use client";

import { use } from "react";
import useSWR from "swr";

import  {getTeacher} from "@/services/teacher.service"

export default function TeacherPage({ params }) {
  const { id } = use(params);

  const { data: teacher, error, isLoading } = useSWR(
    `/teachers/${id}`,
    ()=>getTeacher(id)
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div className="space-y-6 bg-amber-400">
      <h1 className="text-3xl font-bold">
        مرحباً {teacher?.name}
      </h1>


     
    </div>
  );
}