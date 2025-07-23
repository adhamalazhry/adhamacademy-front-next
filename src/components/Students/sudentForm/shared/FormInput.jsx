export default function FormInput({
  label,
  name,
  type = "text",
  register,
  error,
  requiredMessage,
  options,       // قائمة الخيارات (select)
  placeholder,   // نص يظهر داخل input
}) {
  const baseClass =
    "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white";

  return (
    <div>
      {/* عنوان الحقل */}
      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {options ? (
        // لو فيه options → نعرض قائمة select
        <select
          {...register(name, requiredMessage ? { required: requiredMessage } : {})}
          className={baseClass}
        >
          <option value="">-- اختر --</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        // input عادي
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, requiredMessage ? { required: requiredMessage } : {})}
          className={baseClass}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
