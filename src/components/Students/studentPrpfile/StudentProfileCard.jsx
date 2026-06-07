export default function StudentProfileCard({ student }) {
  return (
    <section
      className="
        max-w-4xl
        mx-auto
        flex
        flex-row-reverse
        items-center
        justify-between
        p-8
        rounded-3xl
        border
        border-slate-200
        bg-gradient-to-l from-blue-50 via-white to-slate-50
        shadow-md
      "
    >
      {/* الصورة */}
      <div
        className="
          h-28
          w-28
          rounded-full
          border-4
          border-blue-200
          bg-blue-100
          shrink-0
        "
      />

      {/* البيانات */}
      <div className="flex-1 mr-8 text-right">
        <h1 className="text-3xl font-bold text-slate-800">{student?.name}</h1>

        <p className="mt-1 text-slate-500">طالب</p>

        <div className="flex flex-row-reverse items-center gap-4 mt-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            منتظم في الحضور
          </span>

          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            نشط
          </span>
        </div>

        <div className="flex flex-row-reverse justify-end gap-12 mt-6">
          <div>
            <p className="text-sm text-slate-500">كود الطالب</p>
            <p className="font-semibold text-slate-800">STD-2023-20</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">تاريخ الانضمام</p>
            <p className="font-semibold text-slate-800">20-03-2023</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">تاريخ الميلاد</p>
            <p className="font-semibold text-slate-800">{student.birthDate} </p>
          </div>
        </div>
      </div>
    </section>
  );
}
