export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      date: "17 مارس 2026",
      surah: "الأحزاب",
      fromAyah: 1,
      toAyah: 35,
      evaluation: "ممتاز",
      note: "أداء ممتاز مع ثبات جيد في التسميع وتطبيق واضح لأحكام التجويد.",
    },
    {
      id: 2,
      date: "15 مارس 2026",
      surah: "الحجرات",
      fromAyah: 1,
      toAyah: 10,
      evaluation: "جيد جدًا",
      note: "مستوى جيد جدًا ويحتاج فقط إلى مزيد من التركيز في بعض المواضع.",
    },
    {
      id: 3,
      date: "12 مارس 2026",
      surah: "الملك",
      fromAyah: 5,
      toAyah: 14,
      evaluation: "جيد",
      note: "أداء جيد مع حاجة إلى مراجعة بسيطة وتثبيت الآيات.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">ملف الطالب</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              تقارير الحصص
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              هنا تظهر جميع التقارير المضافة للطالب بشكل واضح ومنظم، مع تاريخ كل
              حصة والسورة والآيات والتقييم والملاحظات.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <SummaryCard label="عدد التقارير" value={reports.length} />
            <SummaryCard
              label="آخر سورة"
              value={reports[0]?.surah || "—"}
            />
            <SummaryCard
              label="آخر تقييم"
              value={reports[0]?.evaluation || "—"}
            />
          </div>
        </div>
      </div>

      {/* Reports */}
      {reports.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-5">
          {reports.map((report, index) => (
            <ReportRow
              key={report.id}
              report={report}
              isLatest={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReportRow({ report, isLatest }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[180px_1fr]">
        {/* Left side */}
        <div className="border-b border-slate-200 bg-slate-50 p-5 md:border-b-0 md:border-l">
          <div className="flex h-full flex-col justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500">
                تاريخ الحصة
              </p>
              <p className="mt-2 text-base font-bold text-slate-900">
                {report.date}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {isLatest && (
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                  الأحدث
                </span>
              )}
              <EvaluationBadge evaluation={report.evaluation} />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  سورة {report.surah}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  من آية{" "}
                  <span className="font-bold text-slate-900">
                    {report.fromAyah}
                  </span>{" "}
                  إلى آية{" "}
                  <span className="font-bold text-slate-900">
                    {report.toAyah}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoBox label="السورة" value={report.surah} />
              <InfoBox label="بداية التسميع" value={`آية ${report.fromAyah}`} />
              <InfoBox label="نهاية التسميع" value={`آية ${report.toAyah}`} />
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                ملاحظات التقرير
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {report.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function EvaluationBadge({ evaluation }) {
  const styles = {
    ممتاز: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "جيد جدًا": "bg-sky-50 text-sky-700 border-sky-200",
    جيد: "bg-amber-50 text-amber-700 border-amber-200",
    مقبول: "bg-orange-50 text-orange-700 border-orange-200",
    ضعيف: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[evaluation] || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {evaluation}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
        📄
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">
        لا توجد تقارير بعد
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        عند إضافة أول تقرير سيظهر هنا بشكل مرتب وواضح
      </p>
    </div>
  );
}