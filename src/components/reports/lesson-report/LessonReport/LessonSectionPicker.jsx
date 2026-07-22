"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const toneClasses = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: "📖",
  },

  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "🔁",
  },

  amber: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: "📋",
  },

  violet: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-200",
    icon: "🎙️",
  },

  slate: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    icon: "📄",
  },
};

export default function LessonSectionPicker({
  sections = [],
  onEnableSection,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          تقرير الحصة
        </span>

        <h2 className="mt-4 text-2xl font-black text-slate-900">
          أضف أقسام التقرير
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          اختر القسم الذي تريد إضافته، وسيظهر مباشرة داخل التقرير.
        </p>
      </div>

      {/* Sections */}

      <AnimatePresence>
        {sections.map((section, index) => {
          const tone =
            toneClasses[section.tone] || toneClasses.slate;

          return (
            <motion.button
              key={section.key}
              type="button"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
              }}
              onClick={() => onEnableSection(section.key)}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                border-b
                border-slate-100
                px-6
                py-5
                text-right
                transition-all
                duration-300
                hover:bg-slate-50
              "
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    text-xl
                    ${tone.bg}
                    ${tone.text}
                  `}
                >
                  {tone.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900">
                  إضافة
                </span>

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    transition-transform
                    duration-300
                    group-hover:rotate-90
                    ${
                      tone.text === "text-emerald-700"
                        ? "bg-emerald-600"
                        : tone.text === "text-blue-700"
                        ? "bg-blue-600"
                        : tone.text === "text-amber-700"
                        ? "bg-amber-500"
                        : tone.text === "text-violet-700"
                        ? "bg-violet-600"
                        : "bg-slate-700"
                    }
                  `}
                >
                  <Plus size={18} />
                </div>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>

      {sections.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-lg font-bold text-slate-900">
            تمت إضافة جميع الأقسام
          </p>

          <p className="mt-2 text-sm text-slate-500">
            يمكنك الآن البدء في كتابة التقرير.
          </p>
        </div>
      )}
    </section>
  );
}