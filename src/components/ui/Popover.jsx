export default function Popover({ open, trigger, children, className = "" }) {
  return (
    <div className="relative inline-block text-left">
      <div>{trigger}</div>
      {open ? (
        <div
          className={`absolute right-0 z-50 mt-2 w-[320px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ${className}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
