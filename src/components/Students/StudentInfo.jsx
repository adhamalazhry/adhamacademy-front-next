export default function StudentInfoCard({ student }) {
  const infoFields = [
    { label: "الاسم الكامل", value: student?.name, icon: "👤" },
    { label: "العمر", value: student?.age, icon: "🎂" },
    { label: "الجنس", value: student?.gender, icon: "⚧" },
    { label: "الجنسية", value: student?.nationality, icon: "🌍" },
    { label: "بلد الإقامة", value: student?.residency, icon: "📍" },
    { label: "رقم الهاتف", value: student?.phone, icon: "📞" },
    { label: "رقم ولي الأمر", value: student?.guardianPhone, icon: "📞" },
    { label: "البريد الإلكتروني", value: student?.email, icon: "✉️" },
    { label: "العنوان", value: student?.address, icon: "🏠" },
    { label: "تاريخ الاشتراك", value: student?.subscriptionDate, icon: "🗓️" },
    { label: "عدد الحصص الشهرية", value: student?.monthlySessions, icon: "📚" },
    { label: "المعلم المتابع", value: student?.teacher?.name, icon: "👨‍🏫" },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          👤
        </div>

        <h2 className="text-xl font-bold text-slate-900">معلومات الطالب</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {infoFields.map((field) => (
          <InfoRow
            key={field.label}
            label={field.label}
            value={field.value}
            icon={field.icon}
          />
        ))}
      </div>
    </section>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-right shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-700">{value || "-"}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
        <span className="text-xl leading-none">{icon}</span>
      </div>
    </div>
  );
}
