export default function StudentData({ student }) {
  return (
    <section
      className="
        bg-white
        max-w-4xl
        h-44
        rounded-3xl
        mx-auto
        flex
        flex-row-reverse
        items-center
        p-6
        border
        border-gray-200
        shadow-sm
      "
    >
      <div
        className="
          h-28
          w-28
          rounded-full
          border-4
          border-blue-100
          bg-blue-50
        "
      ></div>

      <div className="mr-6 text-right">
        <h1 className="text-2xl font-bold text-slate-800">
          {student?.name}
        </h1>

        <p className="mt-2 text-slate-500">
          طالب بأكاديمية الأدهم
        </p>
      </div>
    </section>
  );
}