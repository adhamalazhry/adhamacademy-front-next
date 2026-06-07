import Link from "next/link";
import Image from "next/image";

const studentLinks = [
  { title: "الصفحة الرئيسية", href: "", icon: "🏠" },
  { title: "الملف الشخصي", href: "profile", icon: "👤" },
  { title: "جدول الحصص", href: "schedule", icon: "📅" },
  { title: "تقارير الحصص", href: "reports", icon: "📊" },
  { title: "الاشتراكات", href: "payments", icon: "💳" },
  { title: "الرسائل", href: "messages", icon: "💬", badge: 3 },
  { title: "الإشعارات", href: "notifications", icon: "🔔", badge: 5 },
  { title: "الإعدادات", href: "settings", icon: "⚙️" },
];

export default function StudentSidebar({ id }) {
  return (
    <aside className="h-screen w-72 shrink-0 border-l border-gray-200 bg-white px-6 py-6">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-3 border-b pb-6">
        <Image
          src="/logo.png"
          alt="Academy Logo"
          width={50}
          height={50}
          className="rounded-lg"
        />

        <Link href="/">
          <div className="text-right group cursor-pointer">
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
              أكاديمية الأدهم
            </h2>
            <p className="text-sm text-slate-500 group-hover:text-blue-500 transition">
              للتعليم عبر الإنترنت
            </p>
          </div>
        </Link>
      </div>

      {/* Links */}
      <nav className="space-y-3">
        {studentLinks.map((link) => {
          const href = `/students/${id}${link.href ? `/${link.href}` : ""}`;

          return (
            <Link
              key={link.title}
              href={href}
              className="relative flex items-center justify-between rounded-xl px-4 py-3 text-slate-800 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="text-2xl">{link.icon}</span>

              <span className="text-lg font-semibold">{link.title}</span>

              {link.badge && (
                <span className="absolute right-7 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Help Box */}
      <div className="mt-10 border-t pt-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎧</div>

            <div className="text-right">
              <h3 className="font-bold text-slate-900">تحتاج مساعدة؟</h3>
              <p className="text-sm text-slate-500">تواصل مع الدعم الفني</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
