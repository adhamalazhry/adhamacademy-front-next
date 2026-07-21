export default function TeacherItem({ teacher, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-right transition ${
        isSelected
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-gray-200 bg-white text-slate-900 hover:border-blue-400 hover:bg-slate-50"
      }`}
    >
      <div className="space-y-1 text-sm">
        <p className="font-medium">{teacher.name}</p>
        {teacher.email ? (
          <p className="text-xs text-slate-500">{teacher.email}</p>
        ) : null}
      </div>
      <span className="text-xs">{isSelected ? "محدد" : ""}</span>
    </button>
  );
}
