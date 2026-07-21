"use client";

import { AnimatePresence, motion } from "framer-motion";

const toneClasses = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
  blue: "border-blue-200 bg-blue-50 text-blue-900",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  violet: "border-violet-200 bg-violet-50 text-violet-900",
  teal: "border-teal-200 bg-teal-50 text-teal-900",
  fuchsia: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900",
  rose: "border-rose-200 bg-rose-50 text-rose-900",
  slate: "border-slate-200 bg-slate-50 text-slate-900",
};

export default function LessonSectionPicker({ sections, onEnableSection }) {
  return (
    <section className="rounded-[1.9rem] border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/70">
      <div className="text-right">
        <p className="text-xs font-bold tracking-[0.15em] text-slate-500">SECTION PICKER</p>
        <h2 className="mt-1 text-xl font-extrabold text-slate-900">أضف اقسام التقرير</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">كل بطاقة تمثل قسما مستقلا. عند التفعيل تختفي البطاقة ويظهر القسم مباشرة في النموذج.</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.button
              key={section.key}
              type="button"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => onEnableSection(section.key)}
              className={`rounded-2xl border p-4 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${toneClasses[section.tone] || toneClasses.slate}`}
            >
              <p className="text-[11px] font-bold tracking-[0.16em] opacity-75">{section.group.toUpperCase()}</p>
              <h3 className="mt-2 text-lg font-extrabold">{section.title}</h3>
              <p className="mt-2 text-sm opacity-85">{section.description}</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
