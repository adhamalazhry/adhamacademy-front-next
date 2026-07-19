export default function Textarea({
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <textarea
      rows={rows}
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
        resize-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
      {...props}
    />
  );
}