import Button from "@/components/ui/Button";

export default function TeacherActions({ hasTeacher, teacherName, onOpenPicker }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-900">
        {hasTeacher ? (
          <>
            <p className="font-medium">المعلم الحالي</p>
            <p>{teacherName}</p>
          </>
        ) : (
          <p>لا يوجد معلم للطالب حالياً.</p>
        )}
      </div>

      <Button type="button" className="w-full" onClick={onOpenPicker}>
        {hasTeacher ? "تغيير المعلم" : "إضافة معلم"}
      </Button>
    </div>
  );
}
