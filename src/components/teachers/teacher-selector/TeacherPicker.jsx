import Button from "@/components/ui/Button";
import TeacherSearch from "./TeacherSearch";
import TeacherList from "./TeacherList";
import { ChevronLeft } from "lucide-react";

export default function TeacherPicker({
  title,
  searchValue,
  onSearchChange,
  teachers,
  selectedTeacherId,
  onSelectTeacher,
  onSave,
  onBack,
  isLoading,
  isSaving,
  error,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-700 transition hover:bg-slate-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <div className="h-10 w-10" />
      </div>

      <TeacherSearch value={searchValue} onChange={onSearchChange} />

      <TeacherList
        teachers={teachers}
        selectedTeacherId={selectedTeacherId}
        onSelectTeacher={onSelectTeacher}
        isLoading={isLoading}
        error={error}
      />

      <Button
        type="button"
        className="w-full"
        onClick={onSave}
        disabled={isSaving || !selectedTeacherId}
      >
        {isSaving ? "جاري الحفظ..." : "حفظ"}
      </Button>
    </div>
  );
}
