import TeacherItem from "./TeacherItem";

export default function TeacherList({
  teachers,
  selectedTeacherId,
  onSelectTeacher,
  isLoading,
  error,
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-12 rounded-2xl bg-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
        حدث خطأ أثناء جلب المعلمين.
      </div>
    );
  }

  if (!teachers || teachers.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        لا يوجد معلمين متاحين.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      {teachers.map((teacher) => (
        <TeacherItem
          key={teacher.id}
          teacher={teacher}
          isSelected={teacher.id === selectedTeacherId}
          onSelect={() => onSelectTeacher(teacher.id)}
        />
      ))}
    </div>
  );
}
