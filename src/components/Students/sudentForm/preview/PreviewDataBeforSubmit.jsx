"use client";
import { fieldLabels } from "./fieldLabels";

export default function PreviewDataBeforeSubmit({ watch }) {
  const data = watch();

  return (
    <div className="bg-white dark:bg-gray-900 border border-blue-300 dark:border-gray-700 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto mt-10">
      {/* Heading */}
      <h3 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-10">
        ✅ Preview Before Submission
      </h3>

      <div className="space-y-6">
        {Object.entries(data).map(([key, value]) => {
          const field = fieldLabels[key] || { label: key };

          // 🎯 Attendance Days
          if (key === "selectedDays") {
            return (
              <div
                key={key}
                className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-start gap-3"
              >
                {field.icon && <div className="mt-1">{field.icon}</div>}
                <div>
                  <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2 text-sm">
                    {field.label}
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                </div>
              </div>
            );
          }

          // 🕓 Attendance Schedule
          if (key === "schedule" && typeof value === "object") {
            return (
              <div
                key={key}
                className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
              >
                <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-3 flex items-center gap-2 text-sm">
                  {field.icon} {field.label}
                </h4>
                <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm pl-4 list-disc">
                  {Object.entries(value).map(([day, times]) => (
                    <li key={day}>
                      <span className="font-semibold text-blue-600 dark:text-blue-300">
                        {day}:
                      </span>{" "}
                      From {times.from || "—"} to {times.to || "—"}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          // ✅ Regular Fields
          return (
            <div
              key={key}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-start gap-3 text-sm"
            >
              {field.icon && <div className="mt-1 text-blue-500">{field.icon}</div>}
              <div>
                <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-1">
                  {field.label}
                </h4>
                <p className="text-gray-800 dark:text-gray-200">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
