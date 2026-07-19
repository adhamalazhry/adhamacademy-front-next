export default function ReportCard({ report }) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 border-b pb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">تقرير حصة</h2>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            #{report.id}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {report.day || "اليوم غير محدد"} - {report.date}
        </p>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <h3 className="mb-3 font-bold text-green-900">
            ما قمت بحفظه
          </h3>

          <p className="font-semibold text-green-950">
            {report.recitationSurah || "لا يوجد"}
          </p>

          <p className="mt-1 text-sm text-green-800">
            من {report.recitationFrom || "-"} إلى{" "}
            {report.recitationTo || "-"}
          </p>

          <p className="mt-3 text-sm">
            <span className="font-semibold text-green-900">
              التقييم:
            </span>{" "}
            {report.recitationEvaluation || "بدون تقييم"}
          </p>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-3 font-bold text-blue-900">
            ما قمت بمراجعته
          </h3>

          <p className="font-semibold text-blue-950">
            {report.revisionSurah || "لا يوجد"}
          </p>

          <p className="mt-1 text-sm text-blue-800">
            من {report.revisionFrom || "-"} إلى{" "}
            {report.revisionTo || "-"}
          </p>

          <p className="mt-3 text-sm">
            <span className="font-semibold text-blue-900">
              التقييم:
            </span>{" "}
            {report.revisionEvaluation || "بدون تقييم"}
          </p>
        </section>

        <section className="rounded-2xl border border-purple-200 bg-purple-50 p-4">
          <h3 className="mb-2 font-bold text-purple-900">
            أحكام التجويد
          </h3>

          <p className="text-sm text-purple-950">
            {report.tajweedRules || "لا يوجد"}
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="mb-3 font-bold text-amber-900">
            المطلوب منك
          </h3>

          <div className="space-y-3 text-sm text-amber-950">
            <div>
              <p className="font-semibold">الحفظ الجديد</p>

              <p>
                {report.homeworkSurah || "لا يوجد"} — من{" "}
                {report.homeworkFrom || "-"} إلى{" "}
                {report.homeworkTo || "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold">المراجعة</p>

              <p>
                {report.homeworkRevisionSurah || "لا يوجد"} — من{" "}
                {report.homeworkRevisionFrom || "-"} إلى{" "}
                {report.homeworkRevisionTo || "-"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-gray-50 p-4">
          <h3 className="mb-2 font-bold text-gray-900">
            ملاحظات المعلم
          </h3>

          <p className="text-sm text-gray-700">
            {report.notes || "لا توجد ملاحظات"}
          </p>
        </section>
      </div>
    </div>
  );
}