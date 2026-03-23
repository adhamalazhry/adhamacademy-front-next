import Link from "next/link";

export default async function StudentLayout({ children, params }) {
  const { id } = await params;

  const student = {
    id,
    name: "عبدالرحمن محمد",
    level: "طالب في برنامج الحفظ",
    teacher: "الشيخ أحمد",
    status: "منتظم",
  };

  const navLinks = [
    { label: "الرئيسية", href: `/students/${id}` },
    { label: "الملف الشخصي", href: `/students/${id}/profile` },
    { label: "التقارير", href: `/students/${id}/reports` },
    { label: "الاشتراك", href: `/students/${id}/subscriptions` },
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl p-6">
        {/* Header */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-sm border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700" />

          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-gray-800 shadow">
                {student.name.charAt(0)}
              </div>

              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                {student.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">{student.level}</p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
                  المعلم: {student.teacher}
                </span>
                <span className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
                  الحالة: {student.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-2xl bg-white p-3 shadow-sm border border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm border border-gray-100">
          {children}
        </div>
      </div>
    </section>
  );
}