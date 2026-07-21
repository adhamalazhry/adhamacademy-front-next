"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Sidebar({
  title,
  subtitle,
  logo,
  links = [],
  helpBox,
  isOpen = false,
  onClose,
  activePath,
}) {
  const mobileState = isOpen ? "translate-x-0" : "translate-x-full";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[300px] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${mobileState} lg:static lg:translate-x-0 lg:max-w-[280px]`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 lg:px-6">
          <Logo src={logo} title={title} subtitle={subtitle} />
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            aria-label="إغلاق الشريط الجانبي"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-6">
          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = activePath?.startsWith(link.href);

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-right transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm font-semibold">{link.title}</span>
                  </span>

                  {link.badge ? (
                    <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {helpBox ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-2xl">{helpBox.icon}</div>
                <div className="text-right">
                  <h3 className="text-sm font-semibold text-slate-900">{helpBox.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{helpBox.description}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}