"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function StudentHeader({ id }) {
  const { data: student } = useSWR(
    `http://localhost:3001/students/${id}`,
    fetcher
  );

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-800">
        Student Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-gray-800">
            {student?.name}
          </p>

          <p className="text-sm text-gray-500">
            Student
          </p>
        </div>

        <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold">
          {student?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}