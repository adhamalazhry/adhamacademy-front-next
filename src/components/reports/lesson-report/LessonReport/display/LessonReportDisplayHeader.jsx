"use client";

import { motion } from "framer-motion";

function Avatar({ name, tone = "slate" }) {
  const initial = String(name || "?").trim().charAt(0) || "?";
  const tones = {
    slate: "from-slate-900 to-slate-700",
    sky: "from-sky-700 to-cyan-600",
  };

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-extrabold text-white ${tones[tone] || tones.slate}`}
    >
      {initial}
    </div>
  );
}

function StatItem({ label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-right shadow-sm shadow-slate-200/40">
      <p className="text-[11px] font-bold tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-base font-bold text-slate-900">{value || "-"}</p>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}

export default function LessonReportDisplayHeader({
  student,
  teacherName,
  teacherEmail,
  dateValue,
  lessonDay,
  lessonDuration,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(241,245,249,0.98)_58%,_rgba(226,232,240,0.85))] p-5 shadow-lg shadow-slate-300/40"
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white/75 p-5">
          <p className="text-xs font-bold tracking-[0.18em] text-slate-500">LESSON REPORT</p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">إضافة تقرير حصة</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            سجل تفاصيل الحصة بشكل احترافي مع توثيق الأداء، الواجب، والملاحظات في مكان واحد.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <Avatar name={student?.name} tone="slate" />
              <div className="text-right">
                <p className="text-xs text-slate-500">الطالب</p>
                <p className="text-sm font-bold text-slate-900">{student?.name || "غير محدد"}</p>
                <p className="text-xs text-slate-500">{student?.email || ""}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <Avatar name={teacherName} tone="sky" />
              <div className="text-right">
                <p className="text-xs text-slate-500">المعلم</p>
                <p className="text-sm font-bold text-slate-900">{teacherName || "غير محدد"}</p>
                <p className="text-xs text-slate-500">{teacherEmail || ""}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <StatItem label="تاريخ الحصة" value={dateValue || "-"} />
          <StatItem label="اليوم" value={lessonDay || "اختر التاريخ"} />
          <StatItem
            label="المدة"
            value={lessonDuration ? `${lessonDuration} دقيقة` : "غير متاح"}
            helper="تجلب تلقائيا من الاشتراك"
          />
        </div>
      </div>
    </motion.section>
  );
}
