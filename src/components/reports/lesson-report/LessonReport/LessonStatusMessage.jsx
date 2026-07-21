"use client";

import { AnimatePresence, motion } from "framer-motion";

const toneClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-100/60",
  error: "border-rose-200 bg-rose-50 text-rose-700 shadow-rose-100/60",
};

export default function LessonStatusMessage({ message, type = "success" }) {
  const tone = toneClasses[type] || toneClasses.success;

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm ${tone}`}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
