import Button from "@/components/ui/Button";

export default function ReportItemCard({
  index,
  title,
  accent = "emerald",
  onRemove,
  children,
}) {
  const accentClasses = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <article className="rounded-[1.6rem] border border-white/70 bg-white p-5 shadow-sm shadow-slate-200/60">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${accentClasses[accent]}`}>
            {title}
          </p>
          {typeof index === "number" ? (
            <p className="mt-2 text-xs font-medium text-slate-500">العنصر #{index + 1}</p>
          ) : null}
        </div>

        {onRemove ? (
          <Button type="button" variant="danger" onClick={onRemove}>
            حذف
          </Button>
        ) : null}
      </div>

      {children}
    </article>
  );
}
