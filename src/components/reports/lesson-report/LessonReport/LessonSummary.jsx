"use client";

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-right">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function LessonSummary({ summary }) {
  return (
    <section className="rounded-[1.7rem] border border-slate-200 bg-white/85 p-5 shadow-sm shadow-slate-200/70">
      <div className="text-right">
        <p className="text-xs font-bold tracking-[0.15em] text-slate-500">LIVE SUMMARY</p>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900">ملخص مباشر للمحتوى المدخل</h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <SummaryItem label="عناصر التسميع" value={summary.memorizationCount} />
        <SummaryItem label="مراجعة قريبة" value={summary.nearReviewCount} />
        <SummaryItem label="مراجعة بعيدة" value={summary.distantReviewCount} />
        <SummaryItem label="نقاط التجويد" value={summary.tajweedCount} />
        <SummaryItem label="عناصر الواجب" value={summary.homeworkCount} />
        <SummaryItem
          label="حروف الملاحظات"
          value={summary.generalNotesLength + summary.studentNotesLength + summary.parentNotesLength}
        />
      </div>
    </section>
  );
}
