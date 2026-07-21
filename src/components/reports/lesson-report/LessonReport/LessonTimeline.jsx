"use client";

import { motion } from "framer-motion";

export default function LessonTimeline({ sections, activeSection, onFocusSection }) {
  return (
    <section className="rounded-[1.7rem] border border-slate-200 bg-white/85 p-5 shadow-sm shadow-slate-200/70">
      <div className="text-right">
        <p className="text-xs font-bold tracking-[0.15em] text-slate-500">TIMELINE</p>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900">تسلسل الحصة</h2>
      </div>

      <div className="mt-4 space-y-3">
        {sections.map((section, index) => {
          const isActive = activeSection === section.key;
          const isVisible = section.isVisible;

          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onFocusSection(section.key)}
              className={`relative w-full rounded-2xl border px-4 py-3 text-right transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : isVisible
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {index < sections.length - 1 ? (
                <span className="pointer-events-none absolute -bottom-3 right-6 h-3 w-px bg-slate-300" />
              ) : null}

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-bold">{section.title}</span>
              </div>

              {isActive ? (
                <motion.span
                  layoutId="timeline-active"
                  className="absolute inset-0 -z-10 rounded-2xl border border-slate-900"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
