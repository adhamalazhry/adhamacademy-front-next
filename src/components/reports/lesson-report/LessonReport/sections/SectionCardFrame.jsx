"use client";

import { AnimatePresence, motion } from "framer-motion";

const toneStyles = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
  teal: "bg-teal-500",
  slate: "bg-slate-500",
  fuchsia: "bg-fuchsia-500",
  rose: "bg-rose-500",
};

export default function SectionCardFrame({
  isVisible,
  sectionKey,
  title,
  description,
  tone = "slate",
  icon,
  children,
}) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.section
          id={`section-${sectionKey}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:border-slate-300
            hover:shadow-lg
          "
        >
          {/* Header */}

          <div className="border-b border-slate-200 bg-slate-50">
            <div className="flex items-start gap-5 p-6">

              {/* Accent */}

              <div
                className={`mt-1 h-12 w-1.5 rounded-full ${
                  toneStyles[tone] ?? toneStyles.slate
                }`}
              />

              {/* Icon */}

              {icon && (
                <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm">
                  {icon}
                </div>
              )}

              {/* Title */}

              <div className="flex-1">

                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {title}
                </h3>

                {description && (
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Body */}

          <div className="space-y-6 p-7">
            {children}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}