"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { getTeachers } from "@/services/teacher.service";
import { assignTeacherToStudent } from "@/services/student.service";
import Popover from "@/components/ui/Popover";
import { MoreVertical, UserRound, UserRoundX } from "lucide-react";
import TeacherActions from "./TeacherActions";
import TeacherPicker from "./TeacherPicker";

export default function TeacherSelector({
  student,
  isOpen: controlledIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("actions");
  const [searchValue, setSearchValue] = useState("");

  const [selectedTeacherId, setSelectedTeacherId] = useState(
    student.teacher?.id ?? null,
  );

  const [isSaving, setIsSaving] = useState(false);

  const isControlled =
    typeof controlledIsOpen === "boolean" && typeof onOpenChange === "function";

  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setOpen = isControlled ? onOpenChange : setInternalIsOpen;

  const {
    data: teachers = [],
    error,
    isLoading,
  } = useSWR("/teachers", getTeachers);

  const hasTeacher = Boolean(student.teacher);

  const filteredTeachers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) return teachers;

    return teachers.filter((teacher) =>
      teacher.name?.toLowerCase().includes(query),
    );
  }, [teachers, searchValue]);

  function resetPopover() {
    setActiveView("actions");
    setSearchValue("");
    setSelectedTeacherId(student.teacher?.id ?? null);
  }

  function togglePopover() {
    const nextState = !isOpen;

    setOpen(nextState);

    if (!nextState) {
      resetPopover();
    }
  }

  function closePopover() {
    setOpen(false);
    resetPopover();
  }

  function handlePopoverOpenChange(open) {
    setOpen(open);

    if (!open) {
      resetPopover();
    }
  }

  function openPicker() {
    setSelectedTeacherId(student.teacher?.id ?? null);
    setActiveView("picker");
  }

  async function handleSave() {
    if (!selectedTeacherId || isSaving) return;

    try {
      setIsSaving(true);

      await assignTeacherToStudent(student.id, selectedTeacherId);

      await mutate("/students");

      closePopover();
    } catch (error) {
      console.error("فشل تعيين المعلم:", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={handlePopoverOpenChange}
      trigger={
        <div
          dir="rtl"
          className={`
            group
            inline-flex
            min-w-[210px]
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            px-3
            py-2
            transition-all
            duration-200
            ${
              isOpen
                ? "border-blue-300 bg-blue-50 shadow-sm ring-2 ring-blue-100"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }
          `}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                ${
                  hasTeacher
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              {hasTeacher ? (
                <UserRound className="h-4 w-4" />
              ) : (
                <UserRoundX className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0 text-right">
              <p className="mb-0.5 text-[11px] font-medium text-slate-400">
                المعلم
              </p>

              <p
                className={`
                  truncate
                  text-sm
                  font-semibold
                  ${hasTeacher ? "text-slate-800" : "text-slate-500"}
                `}
              >
                {student.teacher?.name || "غير معيّن"}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="إجراءات المعلم"
            onClick={togglePopover}
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition-all
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              ${
                isOpen
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }
            `}
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div
        dir="rtl"
        className="
          w-[340px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          shadow-slate-900/10
        "
      >
        {activeView === "actions" ? (
          <TeacherActions
            hasTeacher={hasTeacher}
            teacherName={student.teacher?.name}
            onOpenPicker={openPicker}
          />
        ) : (
          <TeacherPicker
            title={hasTeacher ? "تغيير المعلم" : "إضافة معلم"}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            teachers={filteredTeachers}
            selectedTeacherId={selectedTeacherId}
            onSelectTeacher={setSelectedTeacherId}
            onSave={handleSave}
            onBack={() => setActiveView("actions")}
            isLoading={isLoading}
            error={error}
            isSaving={isSaving}
          />
        )}
      </div>
    </Popover>
  );
}
