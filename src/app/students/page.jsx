import Link from "next/link";

export default function StudentsPage() {
  const students = [
    { id: 1, name: "عبدالرحمن" },
    { id: 2, name: "محمد" },
    { id: 3, name: "يوسف" },
    { id: 4, name: "آمنة" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            قائمة الطلاب
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            اختر الطالب لعرض صفحته وتقاريره
          </p>
        </div>

        {/* Students Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {students.map((student) => (
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className="group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-lg font-bold text-gray-800">
                {student.name.charAt(0)}
              </div>

              {/* Name */}
              <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-black">
                {student.name}
              </h2>

              {/* Hint */}
              <p className="mt-1 text-sm text-gray-500">
                اضغط لعرض الملف الشخصي
              </p>

              {/* subtle line effect */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}