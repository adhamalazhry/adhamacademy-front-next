import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";

export default function StudentLayout({ children, params }) {
  const studentId = Number(params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    notFound();
  }

  const teacher = teachers.find((t) => t.id === student.teacherId);

  const navLinks = [
    { label: "الرئيسية", href: `/students/${student.id}` },
    { label: "الملف الشخصي", href: `/students/${student.id}/profile` },
    { label: "التقارير", href: `/students/${student.id}/reports` },
    { label: "الاشتراك", href: `/students/${student.id}/subscriptions` },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {/* Background */}
          <div className="relative h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-300 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-cyan-300 blur-2xl" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%)]" />
          </div>

          {/* Student Info */}
          <div className="relative px-6 pb-8 sm:px-8">
            <div className="-mt-16 flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-white to-slate-100 text-4xl font-extrabold text-slate-800 shadow-xl">
                {student.name?.charAt(0)}
              </div>

              <div className="mt-4 space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {student.name}
                </h1>

                <p className="text-sm font-medium text-slate-500">
                  {student.level || "طالب"} • كود الطالب #{student.id}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  👨‍🏫 المعلم: {teacher?.name || "غير محدد"}
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  🌍 الدولة: {student.country || "غير محددة"}
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  🎂 السن: {student.age || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 rounded-[28px] border border-white/60 bg-white/90 p-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-transparent bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-900 hover:text-white hover:shadow-md"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-300 transition group-hover:bg-white" />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 rounded-[32px] border border-white/60 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.07)] sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">تفاصيل الطالب</h2>
              <p className="mt-1 text-sm text-slate-500">
                عرض كل البيانات والتقارير والاشتراكات الخاصة بالطالب
              </p>
            </div>

            <div className="hidden rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 sm:block">
              لوحة الطالب
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}