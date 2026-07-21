"use client";

import { motion } from "framer-motion";

export default function LessonProgress({ progress, enabledSections }) {
  return (
    <section className="rounded-[1.7rem] border border-slate-200 bg-white/85 p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-right">
          <p className="text-xs font-bold tracking-[0.15em] text-slate-500">PROGRESS</p>
          <h2 className="mt-1 text-lg font-extrabold text-slate-900">اكتمال التقرير</h2>
        </div>
        <p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {progress.enabled}/{progress.total}
        </p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.35 }}
          className="h-full rounded-full bg-gradient-to-r from-slate-900 via-sky-700 to-cyan-500"
        />
      </div>

      <p className="mt-2 text-right text-sm text-slate-600">نسبة التقدم الحالية: {progress.percentage}%</p>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {enabledSections.map((section) => (
          <span key={section.key} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            {section.title}
          </span>
        ))}
      </div>
    </section>
  );
}
