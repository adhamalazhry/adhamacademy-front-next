export default function LessonInfoCard({ label, value, helper }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 text-right shadow-sm shadow-slate-200/60 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-bold tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-3 text-lg font-extrabold leading-8 text-slate-900">{value}</p>
      {helper ? <p className="mt-2 text-xs leading-6 text-slate-500">{helper}</p> : null}
    </div>
  );
}
