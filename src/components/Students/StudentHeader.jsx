"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function StudentHeader({ id }) {
  const { data: student, isLoading } = useSWR(
    `http://localhost:3001/students/${id}`,
    fetcher
  );

  return (
    <header className="h-20 bg-white border-b px-6">
     <div className="flex h-full items-center justify-between flex-row-reverse">
        
        {/* عنوان الصفحة */}
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-800">
           الملف الشخصي
          </h1>

          
        </div>

        {/* بيانات الطالب */}
        <div className="flex items-center gap-5">
          
          {/* إشعارات */}
          <button className="relative text-2xl">
            🔔

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              5
            </span>
          </button>

          {!isLoading && student && (
            <>
              <div className="text-right">
                <h2 className="font-bold text-slate-800">
                  {student.name}
                </h2>

                <p className="text-sm text-slate-500">
                  طالب
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                👨‍🎓
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}