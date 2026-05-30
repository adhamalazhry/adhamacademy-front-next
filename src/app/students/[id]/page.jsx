"use client";

import { use } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function StudentPage({ params }) {
  const { id } = use(params);

  const { data: student, error, isLoading } = useSWR(
    `http://localhost:3001/students/${id}`,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading data</p>;

  return (
    <div className="space-y-6 bg-amber-400">
      <h1 className="text-3xl font-bold">
        مرحباً {student?.name}
      </h1>


     
    </div>
  );
}