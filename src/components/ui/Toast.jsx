"use client";

import { CheckCircle2, X } from "lucide-react";

export default function Toast({
  open,
  message,
  onClose,
  title = "نجاح",
}) {
  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="fixed left-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl shadow-emerald-900/10"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1 text-right">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>

        <button
          type="button"
          aria-label="إغلاق التنبيه"
          onClick={onClose}
          className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}