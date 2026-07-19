export default function FormSection({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4">
        {children}
      </div>
    </section>
  );
}
