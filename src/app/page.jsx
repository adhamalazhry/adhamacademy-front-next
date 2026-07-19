import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#fef9c3] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 text-gray-800 dark:text-white">
      {/* 🔵 شريط التنقل العلوي */}
      <header className="fixed top-0 w-full px-6 py-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-md z-50 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
          📘 Adham Academy
        </h1>

        <nav className="space-x-3 md:space-x-5 flex items-center">
          <Link
            href="/admin"
            className="bg-black from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:scale-105 transition"
          >
            الإشراف
          </Link>
          <Link
            href="/students"
            className="bg-amber-600 from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:scale-105 transition"
          >
            الطلاب
          </Link>
          <Link
            href="/teachers"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:scale-105 transition"
          >
            المعلمون
          </Link>
          <Link
            href="/"
            className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
          >
            🏠 الرئيسية
          </Link>
          <Link
            href="/teachers/add-teacher"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:scale-105 transition"
          >
            ➕ تسجيل معلم
          </Link>
          <Link
            href="/students/add-student"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow hover:scale-105 transition"
          >
            ➕ تسجيل طالب
          </Link>
        </nav>
      </header>

      {/* 💡 محتوى الصفحة */}
      <main className="pt-28 pb-12 px-6 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-3xl bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg p-10 space-y-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
            👨‍🏫 Welcome to Adham Academy
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
            تعليم احترافي للقرآن الكريم، اللغة العربية، وأحكام التجويد <br />
            عبر الإنترنت بإشراف نخبة من معلمي الأزهر الشريف.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/students/add-student">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg hover:scale-105 shadow-lg transition">
                🚀 سجل الآن
              </button>
            </Link>
            <Link href="/teachers/add-teacher">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg hover:scale-105 shadow-lg transition">
                ✍️ انضم كمعلم
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
