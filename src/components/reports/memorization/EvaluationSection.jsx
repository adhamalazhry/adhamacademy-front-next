export default function EvaluationSection({ evaluation }) {
  const styles = {
    ممتاز: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      badge: "bg-green-600",
      icon: "🌟",
    },
    "جيد جدًا": {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-700",
      badge: "bg-blue-600",
      icon: "🔥",
    },
    جيد: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-700",
      badge: "bg-yellow-500",
      icon: "👍",
    },
    default: {
      bg: "bg-gray-50",
      border: "border-gray-300",
      text: "text-gray-700",
      badge: "bg-gray-600",
      icon: "📊",
    },
  };

  const current = styles[evaluation] || styles.default;

  return (
    <div
      className={`${current.bg} ${current.border} flex items-center justify-between rounded-2xl border-2 p-5 shadow-sm`}
    >
      <div>
        <p className={`mb-1 text-sm ${current.text}`}>⭐ التقييم</p>
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          {current.icon} {evaluation}
        </h3>
      </div>

      <span
        className={`${current.badge} rounded-full px-4 py-2 text-sm font-semibold text-white`}
      >
        مستوى
      </span>
    </div>
  );
}