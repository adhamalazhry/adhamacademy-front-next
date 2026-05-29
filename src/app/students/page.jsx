"use client";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function StudentsPage() {
  const { data: students, error, isLoading } = useSWR(
    "http://localhost:3001/students",
    fetcher
  );

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading data</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold">قائمة الطلاب</h1>
        <p className="mb-6 text-sm text-gray-600">
          اختر الطالب لعرض صفحته
        </p>

        <div className="space-y-3">
          {students.map((student) => (
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className="block rounded-lg border p-4 transition hover:bg-gray-50"
            >
              <h2 className="text-base font-medium">{student.name}</h2>
              <p className="text-sm text-gray-500">عرض الملف الشخصي</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}