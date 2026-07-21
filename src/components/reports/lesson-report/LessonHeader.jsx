export default function LessonHeader({ title, description }) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_32%),linear-gradient(135deg,_#ffffff_0%,_#f8fbff_52%,_#f0f9ff_100%)] p-6 text-right shadow-sm">
      <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(180deg,_rgba(14,165,233,0.08),_transparent)]" />
      <div className="relative space-y-3">
        <span className="inline-flex rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-bold tracking-[0.18em] text-sky-700">
          نموذج التقرير
        </span>
        <h1 className="text-3xl font-black leading-tight text-slate-900">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </header>
  );
}
