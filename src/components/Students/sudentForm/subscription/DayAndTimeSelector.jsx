import { useState } from "react";

// الأيام المتاحة للاختيار - Available attendance days
const days = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

// مكون جدول الحضور والتوقيت - Attendance schedule form component
export default function DayAndTimeSelector({ register, setValue, watch }) {
  // مراقبة الأيام المختارة من الفورم - Watch selected days from form state
  const selectedDays = watch("selectedDays") || [];

  return (
    <div className="space-y-4">
      {/* عنوان القسم - Section title */}
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        جدول الحضور والتوقيت
      </label>

      {/* ✅ عرض الأيام كمجموعة من checkboxes بشكل أفقي - Horizontal days list */}
      <div className="flex flex-wrap gap-3">
        {days.map((day, index) => (
          <label
            key={index}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <input
              type="checkbox"
              value={day}
              {...register("selectedDays")}
              className="accent-blue-600"
            />
            {day}
          </label>
        ))}
      </div>

      {/* ✅ عرض توقيت الحضور فقط لليوم الذي تم اختياره - Show time inputs for selected days only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {selectedDays.map((day, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
          >
            {/* اسم اليوم المختار - Selected day label */}
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
              {day}
            </h4>

            {/* حقول التوقيت (من - إلى) - Time fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* وقت البداية - Start time */}
              <div>
                <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">
                  من
                </label>
                <input
                  type="time"
                  {...register(`schedule.${day}.from`)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* وقت النهاية - End time */}
              <div>
                <label className="block text-xs mb-1 text-gray-600 dark:text-gray-300">
                  إلى
                </label>
                <input
                  type="time"
                  {...register(`schedule.${day}.to`)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
