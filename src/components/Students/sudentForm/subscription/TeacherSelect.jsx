// كمبوننت FormSelect - لعرض قائمة منسدلة بخيارات محددة مسبقًا

export default function FormSelect({ label, name, register, options }) {
  return (
    <div>
      {/* عنوان الحقل - Field label */}
      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {/* قائمة منسدلة - Dropdown select input */}
      <select
        {...register(name)} // ربط الحقل بـ react-hook-form - Bind to form state
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
      >
        {/* عرض كل خيار من options كمُدخل داخل القائمة - Render each option */}
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
