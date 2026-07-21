"use client";

import Link from "next/link";
import { Bell, MessageCircle, Menu, User2 } from "lucide-react";

export default function Header({
  title,
  onToggleSidebar,
  userName,
  profileHref = "#",
  notifications = 0,
  messages = 0,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="فتح الشريط الجانبي"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              لوحة التحكم
            </p>
            <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-2 sm:flex">
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-slate-200"
              aria-label="الإشعارات"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[0.65rem] font-semibold text-white">
                  {notifications}
                </span>
              )}
            </button>

            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-slate-200"
              aria-label="الرسائل"
            >
              <MessageCircle className="h-5 w-5" />
              {messages > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[0.65rem] font-semibold text-white">
                  {messages}
                </span>
              )}
            </button>
          </div>

          <Link
            href={profileHref}
            className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-right transition hover:border-slate-300 hover:bg-slate-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <User2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {userName || "المستخدم"}
              </p>
              <p className="text-xs text-slate-500">عرض الملف الشخصي</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}