export default function TeacherStatCard({
  title,
  value,
  subtitle,
  trend,
}) {
  const trendValue = Number(trend?.value || 0);
  const isPositive = trendValue >= 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

      {subtitle ? (
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      ) : null}

      {trend ? (
        <p
          className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          <span>{isPositive ? "▲" : "▼"}</span>
          <span>{Math.abs(trendValue)}%</span>
          <span>عن الشهر السابق</span>
        </p>
      ) : null}
    </article>
  );
}
