export default function MetricCard({
  label,
  value,
  hint,
  accent = "blue",
}) {
  const accentClass = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    rose: "bg-rose-50 text-rose-700",
  }[accent];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? (
        <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accentClass}`}>
          {hint}
        </p>
      ) : null}
    </article>
  );
}
