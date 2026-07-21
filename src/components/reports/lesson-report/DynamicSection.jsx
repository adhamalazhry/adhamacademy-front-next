"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function DynamicSection({
  title,
  description,
  accent = "emerald",
  onRemove,
  children,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const accentClasses = {
    emerald: {
      badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
      ring: "border-emerald-100",
      body: "bg-[linear-gradient(180deg,_rgba(236,253,245,0.72),_rgba(255,255,255,0.98))]",
    },
    blue: {
      badge: "border-blue-200 bg-blue-50 text-blue-700",
      ring: "border-blue-100",
      body: "bg-[linear-gradient(180deg,_rgba(239,246,255,0.82),_rgba(255,255,255,0.98))]",
    },
    violet: {
      badge: "border-violet-200 bg-violet-50 text-violet-700",
      ring: "border-violet-100",
      body: "bg-[linear-gradient(180deg,_rgba(245,243,255,0.82),_rgba(255,255,255,0.98))]",
    },
    amber: {
      badge: "border-amber-200 bg-amber-50 text-amber-700",
      ring: "border-amber-100",
      body: "bg-[linear-gradient(180deg,_rgba(255,251,235,0.82),_rgba(255,255,255,0.98))]",
    },
    slate: {
      badge: "border-slate-200 bg-slate-50 text-slate-700",
      ring: "border-slate-100",
      body: "bg-[linear-gradient(180deg,_rgba(248,250,252,0.92),_rgba(255,255,255,0.98))]",
    },
  };

  const sectionTone = accentClasses[accent] || accentClasses.slate;

  return (
    <section className={`overflow-hidden rounded-[1.9rem] border bg-white shadow-sm shadow-slate-200/70 ${sectionTone.ring}`}>
      <div className="px-6 py-5 text-right">
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            className="flex-1 cursor-pointer text-right"
            onClick={() => setIsOpen((current) => !current)}
          >
            <div className="space-y-2">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${sectionTone.badge}`}>
                {title}
              </span>
              {description ? (
                <p className="text-sm leading-7 text-slate-500">{description}</p>
              ) : null}
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-xs font-bold text-slate-400"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? "إخفاء" : "إظهار"}
            </button>

            {onRemove ? (
              <Button
                type="button"
                variant="secondary"
                className={`border ${sectionTone.badge}`}
                onClick={onRemove}
              >
                حذف القسم
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className={`border-t border-white/70 px-6 py-6 ${sectionTone.body}`}>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
