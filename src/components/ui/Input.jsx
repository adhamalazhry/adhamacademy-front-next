export default function Input({
  type = "text",
  className = "",
  ...props
}) {
  return (
   
    <input
      type={type}
      className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-2.5
        text-gray-900
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        disabled:bg-gray-100
        ${className}
      `}
      {...props}
    />
   
  );
}