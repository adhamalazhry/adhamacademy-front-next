import Link from "next/link";
import { resolveHomeworkSections } from "./report-normalizers";

function ValueBadge({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-right">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value || "-"}</p>
    </div>
  );
}

function ItemRow({ item, showEvaluation = true, showNotes = true }) {
  const fromAyah = item?.fromAyah ?? item?.from ?? item?.startAyah;
  const toAyah = item?.toAyah ?? item?.to ?? item?.endAyah;

  return (
    <div className="rounded-xl border border-white/70  p-3">
      <p className="font-semibold text-slate-900">
        {item?.surah || item?.title || "-"}
      </p>

      {fromAyah || toAyah ? (
        <p className="mt-1 text-sm text-slate-600">
          من {fromAyah || "-"} إلى {toAyah || "-"}
        </p>
      ) : null}

      {showEvaluation && item?.evaluation ? (
        <p className="mt-1 text-xs font-semibold text-slate-500">
          التقييم: {item.evaluation}
        </p>
      ) : null}

      {showNotes && item?.notes ? (
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
          {item.notes}
        </p>
      ) : null}
    </div>
  );
}

function GroupCard({
  title,
  toneClass,
  items,
  emptyText = "لا يوجد",
  showEvaluation = true,
  showNotes = true,
}) {
  return (
    <section className={`rounded-2xl border p-4  ${toneClass}`}>
      <h3 className="text-sm font-extrabold">{title}</h3>

      {!Array.isArray(items) || items.length === 0 ? (
        <p className="mt-2 text-sm opacity-80">{emptyText}</p>
      ) : (
        <div className="mt-3 space-y-3">
          {items.map((item, index) => (
            <ItemRow
              key={`${title}-${index}`}
              item={item}
              showEvaluation={showEvaluation}
              showNotes={showNotes}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function NotesCard({ title, value }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
        {value || "لا يوجد"}
      </p>
    </section>
  );
}

export default function ReportCard({
  report,
  detailsHref,
  editHref,
  onDelete,
  isDeleting = false,
}) {
  const studentName =
    report?.student?.name || report?.studentName || "طالب غير محدد";
  const teacherName =
    report?.teacher?.name || report?.teacherName || "معلم غير محدد";
  const homeworkSections = resolveHomeworkSections(report);

  return (
    <div className="rounded-[2rem] border  border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(248,250,252,0.98),_rgba(226,232,240,0.8))] p-5 shadow-lg shadow-slate-200/70">
      <header className="mb-5 rounded-2xl border border-slate-200 bg-white/85 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-900">
            تفاصيل تقرير الحصة
          </h2>
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            #{report.id}
          </span>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <ValueBadge
            label="تاريخ الحصة"
            value={String(report?.lessonDate || "-").slice(0, 10)}
          />
          <ValueBadge label="الطالب" value={studentName} />
          <ValueBadge label="المعلم" value={teacherName} />
          <ValueBadge
            label="المدة"
            value={
              report?.lessonDuration || report?.durationMinutes
                ? `${report?.lessonDuration || report?.durationMinutes} دقيقة`
                : "غير متاح"
            }
          />
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        <GroupCard
          title="الحفظ"
          toneClass="border-emerald-200 bg-emerald-50 text-emerald-950"
          items={report?.memorization}
        />

        <GroupCard
          title="المراجعة القريبة"
          toneClass="border-blue-200 bg-blue-50 text-blue-950"
          items={report?.nearReview}
        />

        <GroupCard
          title="المراجعة البعيدة"
          toneClass="border-amber-200 bg-amber-50 text-amber-950"
          items={report?.distantReview}
        />

        <GroupCard
          title="التجويد"
          toneClass="border-violet-200 bg-violet-50 text-violet-950"
          items={report?.tajweedPoints}
          showEvaluation={false}
        />
      </div>

      <section className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-teal-950">
        <h3 className="text-sm font-extrabold">واجب الحصة القادمة</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <GroupCard
            title="حفظ"
            toneClass="border-teal-200 bg-white/70"
            items={homeworkSections.memorization}
            showEvaluation={false}
            showNotes={false}
          />
          <GroupCard
            title="مراجعة قريبة"
            toneClass="border-teal-200 bg-white/70"
            items={homeworkSections.nearReview}
            showEvaluation={false}
            showNotes={false}
          />
          <GroupCard
            title="مراجعة بعيدة"
            toneClass="border-teal-200 bg-white/70"
            items={homeworkSections.distantReview}
            showEvaluation={false}
            showNotes={false}
          />
        </div>
      </section>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <NotesCard title="ملاحظات عامة" value={report?.generalNotes} />
        <NotesCard title="ملاحظات الطالب" value={report?.studentNotes} />
        <NotesCard title="ملاحظات ولي الامر" value={report?.parentNotes} />
      </div>

      {detailsHref || editHref || typeof onDelete === "function" ? (
        <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
          {detailsHref ? (
            <Link
              href={detailsHref}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              عرض
            </Link>
          ) : null}

          {editHref ? (
            <Link
              href={editHref}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              تعديل
            </Link>
          ) : null}

          {typeof onDelete === "function" ? (
            <button
              type="button"
              onClick={() => onDelete(report)}
              disabled={isDeleting}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "جار الحذف..." : "حذف"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
