// مكون عرض قائمة منسدلة - Select dropdown component

export default function FormSelect({
  label,
  name,
  register,
  options,
  error,
  requiredMessage,
}) {
  return (
    <div>
      {/* عنوان الحقل - Label */}
      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {/* قائمة منسدلة - Select input */}
      <select
        {...register(
          name,
          requiredMessage ? { required: requiredMessage } : {}
        )}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
      >
        <option value="">اختر...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* رسالة الخطأ - Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
