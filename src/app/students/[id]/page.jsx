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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        مرحباً {student?.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500">المعلم</p>

          <h2 className="text-2xl font-bold mt-2">
            {student?.teacher?.name || "-"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500">عدد التقارير</p>

          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500">آخر حصة</p>

          <h2 className="text-2xl font-bold mt-2">---</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">آخر التقارير</h2>

        <p className="text-gray-500">لا توجد تقارير حالياً</p>
      </div>
    </div>
  );
}