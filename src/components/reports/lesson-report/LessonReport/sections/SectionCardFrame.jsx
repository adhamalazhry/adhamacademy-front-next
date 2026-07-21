"use client";

import { AnimatePresence, motion } from "framer-motion";

const toneStyles = {
  emerald: "border-emerald-200 bg-[linear-gradient(180deg,_rgba(236,253,245,0.74),_rgba(255,255,255,0.98))]",
  blue: "border-blue-200 bg-[linear-gradient(180deg,_rgba(239,246,255,0.82),_rgba(255,255,255,0.98))]",
  amber: "border-amber-200 bg-[linear-gradient(180deg,_rgba(255,251,235,0.84),_rgba(255,255,255,0.98))]",
  violet: "border-violet-200 bg-[linear-gradient(180deg,_rgba(245,243,255,0.84),_rgba(255,255,255,0.98))]",
  teal: "border-teal-200 bg-[linear-gradient(180deg,_rgba(240,253,250,0.84),_rgba(255,255,255,0.98))]",
  slate: "border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,0.92),_rgba(255,255,255,0.98))]",
  fuchsia: "border-fuchsia-200 bg-[linear-gradient(180deg,_rgba(253,244,255,0.84),_rgba(255,255,255,0.98))]",
  rose: "border-rose-200 bg-[linear-gradient(180deg,_rgba(255,241,242,0.84),_rgba(255,255,255,0.98))]",
};

export default function SectionCardFrame({ isVisible, sectionKey, title, description, tone = "slate", children }) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          id={`section-${sectionKey}`}
          initial={{ opacity: 0, y: 16, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24 }}
          className={`rounded-[1.8rem] border p-4 shadow-sm shadow-slate-200/60 ${toneStyles[tone] || toneStyles.slate}`}
        >
          <div className="mb-4 rounded-[1.2rem] border border-white/80 bg-white/80 px-4 py-4 text-right shadow-sm shadow-slate-200/40">
            <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
            {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
          </div>

          {children}
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
