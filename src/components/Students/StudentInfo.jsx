export default function StudentInfoCard({ student }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          👤
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          معلومات الطالب
        </h2>
      </div>

      {/* Info Rows */}
      <div className="space-y-4 text-right">
        <InfoRow label="الاسم الكامل" value={student?.name} icon="👤" />
        <InfoRow label="تاريخ الميلاد" value={student?.birthDate} icon="📅" />
        <InfoRow label="الجنس" value={student?.gender} icon="⚧" />
        <InfoRow label="رقم الهاتف" value={student?.phone} icon="📞" />
        <InfoRow label="البريد الإلكتروني" value={student?.email} icon="✉️" />
        <InfoRow label="العنوان" value={student?.address} icon="📍" />
      </div>
    </section>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-slate-100 pb-3 last:border-b-0">
      <span className="text-sm font-medium text-slate-700">
        {value || "-"}
      </span>

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-slate-400">
        {icon}
      </span>
    </div>
  );
}