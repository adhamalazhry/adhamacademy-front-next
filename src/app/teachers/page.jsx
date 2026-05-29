"use client";

import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function TeachersPage() {
  const { data: teachers, error, isLoading } = useSWR(
    "http://localhost:3001/teachers",
    fetcher
  );

  if (isLoading) return <p className="p-6 text-gray-500">جار التحميل...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading data</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          👨‍🏫 المعلمون
        </h1>

        <div className="space-y-4">
          {Array.isArray(teachers) &&
            teachers.map((teacher) => (
              <Link
                key={teacher.id}
                href={`/teachers/${teacher.id}`}
                className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm transition"
              >
                {/* left */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {teacher.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {teacher.email || "لا يوجد بريد إلكتروني"}
                  </p>
                </div>

                {/* right */}
                <div className="text-blue-500 text-sm font-medium">
                  عرض →
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}