import { resolveHomeworkSections } from "./report-normalizers";
import {
  BookOpen,
  CalendarDays,
  User,
  NotebookPen,
  RefreshCw,
  Clock3,
  BadgeCheck,
  StickyNote,
} from "lucide-react";

function SummaryCard({ title, count, icon: Icon, accent }) {
  const styles = {
    amber: {
      bg: "from-amber-50 to-white",
      icon: "bg-amber-500 text-white",
      badge: "text-amber-700 bg-amber-100",
    },
    blue: {
      bg: "from-sky-50 to-white",
      icon: "bg-sky-500 text-white",
      badge: "text-sky-700 bg-sky-100",
    },
    emerald: {
      bg: "from-emerald-50 to-white",
      icon: "bg-emerald-500 text-white",
      badge: "text-emerald-700 bg-emerald-100",
    },
  }[accent];

  return (
    <div
      className={`rounded-3xl border border-white bg-gradient-to-br ${styles.bg}
      p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>

          <h3 className="mt-2 text-4xl font-black text-slate-900">
            {count}
          </h3>

          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}
          >
            عنصر
          </span>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  accent,
  items = [],
}) {
  const tone = {
    amber: {
      bg: "from-amber-50 via-white to-white",
      border: "border-amber-200",
      badge: "bg-amber-500 text-white",
      icon: "bg-amber-500 text-white",
    },
    blue: {
      bg: "from-sky-50 via-white to-white",
      border: "border-sky-200",
      badge: "bg-sky-500 text-white",
      icon: "bg-sky-500 text-white",
    },
    emerald: {
      bg: "from-emerald-50 via-white to-white",
      border: "border-emerald-200",
      badge: "bg-emerald-500 text-white",
      icon: "bg-emerald-500 text-white",
    },
  }[accent];

  return (
    <section
      className={`rounded-[32px] border ${tone.border}
      bg-gradient-to-br ${tone.bg}
      p-6 shadow-sm transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon}`}
          >
            <Icon size={22} />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {title}
            </h3>

            <p className="text-sm text-slate-500">
              {items.length} عنصر
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}
        >
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />

          <p className="font-semibold text-slate-500">
            لا يوجد عناصر
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/80 p-5 shadow-md ring-1 ring-slate-100 backdrop-blur transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="text-teal-600" />

                <h4 className="text-lg font-black text-slate-900">
                  {item?.surah || "سورة غير محددة"}
                </h4>
              </div>

              <div className="mt-5 border-r-2 border-slate-200 pr-4">
                <div className="text-sm text-slate-700">
                  من الآية{" "}
                  <span className="font-bold">
                    {item?.fromAyah ??
                      item?.from ??
                      item?.startAyah ??
                      "-"}
                  </span>
                </div>

                <div className="my-2 h-6 border-r border-dashed border-slate-300" />

                <div className="text-sm text-slate-700">
                  إلى الآية{" "}
                  <span className="font-bold">
                    {item?.toAyah ??
                      item?.to ??
                      item?.endAyah ??
                      "-"}
                  </span>
                </div>
              </div>

              {item?.evaluation && (
                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    <BadgeCheck size={14} />
                    {item.evaluation}
                  </span>
                </div>
              )}

              {item?.notes && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-700">
                    <StickyNote size={16} />
                    <span className="font-bold">ملاحظات</span>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">
                    {item.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function NextLessonOverview({
  report,
  studentName,
  showStudentName = false,
  compact = false,
}) {
  const homeworkSections = resolveHomeworkSections(report);

  const memorization = homeworkSections.memorization;
  const nearReview = homeworkSections.nearReview;
  const distantReview = homeworkSections.distantReview;

  const hasHomework =
    memorization.length ||
    nearReview.length ||
    distantReview.length;

  if (!hasHomework) {
    return (
      <div className="rounded-[36px] border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
        <BookOpen className="mx-auto mb-5 h-14 w-14 text-slate-300" />

        <h2 className="text-xl font-black text-slate-800">
          لا يوجد واجب للحصة القادمة
        </h2>

        <p className="mt-3 text-slate-500">
          سيظهر هنا الواجب بمجرد اعتماد التقرير.
        </p>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-[36px] border border-teal-100 bg-gradient-to-br from-white via-teal-50/60 to-cyan-50/70 shadow-xl">
      {/* Hero */}

      <div className="border-b border-teal-100 bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-teal-100">
              <BookOpen size={16} />
              الحصة القادمة
            </p>

            <h2 className="mt-3 text-4xl font-black">
              واجب الطالب
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-teal-50">
              استعد للحصة القادمة من خلال هذا الملخص الذي يجمع
              كل المطلوب حفظه ومراجعته في مكان واحد.
            </p>
          </div>

          <div className="space-y-3">
            {showStudentName && studentName && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                <User size={16} />
                {studentName}
              </div>
            )}

            {report?.lessonDate && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                <CalendarDays size={16} />
                {String(report.lessonDate).slice(0, 10)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="grid gap-5 p-6 md:grid-cols-3">
        <SummaryCard
          title="المطلوب حفظه"
          count={memorization.length}
          icon={NotebookPen}
          accent="amber"
        />

        <SummaryCard
          title="مراجعة قريبة"
          count={nearReview.length}
          icon={RefreshCw}
          accent="blue"
        />

        <SummaryCard
          title="مراجعة بعيدة"
          count={distantReview.length}
          icon={Clock3}
          accent="emerald"
        />
      </div>

      {/* Sections */}

      <div
        className={`grid gap-6 px-6 pb-6 ${
          compact ? "lg:grid-cols-1" : "lg:grid-cols-3"
        }`}
      >
        <SectionCard
          title="المطلوب حفظه"
          icon={NotebookPen}
          accent="amber"
          items={memorization}
        />

        <SectionCard
          title="المراجعة القريبة"
          icon={RefreshCw}
          accent="blue"
          items={nearReview}
        />

        <SectionCard
          title="المراجعة البعيدة"
          icon={Clock3}
          accent="emerald"
          items={distantReview}
        />
      </div>
    </article>
  );
}