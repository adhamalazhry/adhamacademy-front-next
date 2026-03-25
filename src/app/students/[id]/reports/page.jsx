import Link from "next/link";
import { reports } from "@/data/reports";

export default function ReportsPage({ params }) {
  const studentReports = reports.filter(
    (report) => report.studentId === Number(params.id)
  );

  if (studentReports.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
            📘
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            لا توجد تقارير حتى الآن
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            بمجرد إضافة تقارير لهذا الطالب ستظهر هنا بشكل منظم.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl p-6">
      {/* Header */}
      <div className="mb-8 overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600" />

        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white bg-white text-3xl shadow">
              📚
            </div>

            <div className="pt-8">
              <h1 className="text-2xl font-bold text-gray-900">
                تقارير الطالب
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                عدد التقارير: {studentReports.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-5">
        {studentReports.map((report, index) => (
          <Link
            key={report.id}
            href={`/students/${params.id}/reports/${report.id}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200">
              {/* Decorative top line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500" />

              <div className="flex items-start justify-between gap-4">
                {/* Left content */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-blue-600 px-3 text-sm font-bold text-white shadow-sm">
                      #{index + 1}
                    </span>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 transition group-hover:text-blue-700">
                        {report.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {report.date}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-blue-50 px-4 py-3">
                      <p className="mb-1 text-xs font-medium text-blue-600">
                        السورة
                      </p>
                      <p className="font-semibold text-gray-900">
                        {report.surah}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 px-4 py-3">
                      <p className="mb-1 text-xs font-medium text-gray-500">
                        الآيات
                      </p>
                      <p className="font-semibold text-gray-900">
                        من {report.from} إلى {report.to}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end justify-between gap-4">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
                      report.evaluation === "ممتاز"
                        ? "bg-green-100 text-green-700"
                        : report.evaluation === "جيد جدًا"
                        ? "bg-blue-100 text-blue-700"
                        : report.evaluation === "جيد"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {report.evaluation}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    ←
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}