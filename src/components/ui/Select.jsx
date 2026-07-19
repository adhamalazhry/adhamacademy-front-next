export default function Select({
  options = [],
  placeholder = "اختر...",
  className = "",
  ...props
}) {
  return (
    <select
      className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-2.5
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
      {...props}
    >
      <option value="">
        {placeholder}
      </option>

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}