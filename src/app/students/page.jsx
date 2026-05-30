"use client";

import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function StudentsPage() {
  const { data: students, error, isLoading } = useSWR(
    "http://localhost:3001/students",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">جاري تحميل الطلاب...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">
          حدث خطأ أثناء تحميل البيانات
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-slate-800">
              قائمة الطلاب
            </h1>
            <p className="mt-1 text-slate-500">
              إدارة وعرض بيانات الطلاب
            </p>
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow-sm border">
            <p className="text-sm text-gray-500">إجمالي الطلاب</p>
            <p className="text-2xl font-bold text-blue-600">
              {students.length}
            </p>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className="group rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                  👨‍🎓
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                  طالب
                </span>
              </div>

              <h2 className="mb-2 text-lg font-bold text-slate-800">
                {student.name}
              </h2>

              <p className="text-sm text-slate-500">
                اضغط لعرض الملف الشخصي والتقارير
              </p>

              <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700">
                عرض التفاصيل ←
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}