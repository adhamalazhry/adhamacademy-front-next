import ReportCard from "./ReportCard";

export default function StudentReportsList({ reports }) {
  return (
    <div dir="rtl" className="p-6 text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">تقارير الحصص</h1>

        <p className="mt-1 text-sm text-gray-500">
          متابعة الحفظ والمراجعة والواجبات الخاصة بالطالب
        </p>
      </div>

      {reports?.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-gray-500">
          لا توجد تقارير لهذا الطالب حتى الآن
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
            />
          ))}
        </div>
      )}
    </div>
  );
}