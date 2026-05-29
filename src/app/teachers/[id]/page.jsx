"use client";

import { use } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function TeacherIdPage({ params }) {
  const { id } = use(params);

  const { data: teacher, error: teacherError, isLoading: teacherLoading } =
    useSWR(`http://localhost:3001/teachers/${id}`, fetcher);

  const { data: students, error: studentsError, isLoading: studentsLoading } =
    useSWR(`http://localhost:3001/teachers/${id}/students`, fetcher);

  if (teacherLoading || studentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Loading...
      </div>
    );
  }

  if (teacherError || studentsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">
        Error loading data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-8">
        
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
          <div className="bg-slate-900 px-8 py-8 text-white">
            <p className="text-sm text-slate-300 mb-2">Teacher Profile</p>
            <h1 className="text-3xl font-bold">{teacher?.name}</h1>
            <p className="mt-2 text-slate-300">
              {teacher?.email || "لا يوجد بريد إلكتروني"}
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">عدد الطلاب</p>
              <p className="mt-2 text-3xl font-bold">
                {students?.length || 0}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">رقم المعلم</p>
              <p className="mt-2 text-3xl font-bold">#{teacher?.id}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">الحالة</p>
              <p className="mt-2 text-lg font-semibold text-emerald-600">
                Active
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">طلاب المعلم</h2>
              <p className="mt-1 text-sm text-slate-500">
                اضغط على الطالب لفتح صفحته الشخصية
              </p>
            </div>
          </div>

          {students?.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              لا يوجد طلاب لهذا المعلم حاليًا
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {students?.map((student) => (
                <Link
                  key={student.id}
                  href={`/students/${student.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
                      {student.name?.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:underline">
                        {student.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        العمر: {student.age}
                      </p>
                    </div>

                    <span className="text-slate-400 transition group-hover:translate-x-1">
                      ←
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {student.email || "لا يوجد بريد إلكتروني"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}