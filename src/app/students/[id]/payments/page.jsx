"use client";

import { use } from "react";
import useSWR from "swr";
import StudentSubscriptionCard from "@/components/students/StudentSubscriptionCard";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function PaymentsPage({ params }) {
  const { id } = use(params);

  const {
    data: student,
    error: studentError,
    isLoading: studentLoading,
  } = useSWR(`/api/students/${id}`, fetcher);

  const {
    data: reports,
    error: reportsError,
    isLoading: reportsLoading,
  } = useSWR(`/api/reports/student/${id}`, fetcher);

  if (studentLoading || reportsLoading) {
    return <p className="p-6 text-gray-600">Loading...</p>;
  }

  if (studentError || reportsError) {
    return <p className="p-6 text-red-500">Error loading data</p>;
  }

  return (
    <div className="p-6">
      <StudentSubscriptionCard student={student}reports={reports} />

      <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          ملخص الحصص
        </h2>

        <p className="text-gray-700">
          عدد التقارير: {reports?.length || 0}
        </p>
      </div>
    </div>
  );
}