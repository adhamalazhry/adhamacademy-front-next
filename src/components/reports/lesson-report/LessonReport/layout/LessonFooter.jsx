"use client";

import Link from "next/link";

import FormButton from "@/components/forms/FormButton";

export default function LessonFooter({ backHref, isSubmitting, submitLabel }) {
  return (
    <div className="sticky bottom-3 z-20 rounded-[1.4rem] border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-200/70 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3" dir="rtl">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={backHref || ".."}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            رجوع
          </Link>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            معاينة
          </button>
        </div>

        <FormButton loading={isSubmitting} className="min-w-44 bg-slate-900 hover:bg-slate-800">
          {submitLabel}
        </FormButton>
      </div>
    </div>
  );
}
