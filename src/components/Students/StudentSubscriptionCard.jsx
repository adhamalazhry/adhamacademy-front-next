export default function StudentSubscriptionCard({ student, reports = [] }) {
  const subscriptionFee = Number(student?.subscriptionFee) || 0;
  const monthlySessions = Number(student?.monthlySessions) || 0;
  const lessonDuration = Number(student?.lessonDuration) || 0;
  const paidAmount = Number(student?.paidAmount) || 0;
  const currency = student?.currency || "";

  const reportsCount = reports.length;

  const lessonPrice =
    monthlySessions > 0 ? subscriptionFee / monthlySessions : 0;

  const dueAmount = lessonPrice * reportsCount;

  const completedHours =
    lessonDuration > 0 ? (reportsCount * lessonDuration) / 60 : 0;

  const balance = paidAmount - dueAmount;

  const isCredit = balance > 0;
  const isPaidFull = balance === 0;

  return (
    <section
      dir="rtl"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900">
          الاشتراك والحسابات
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          ملخص رسوم الطالب والحصص والمدفوعات
        </p>
      </div>

      {/* بيانات الاشتراك */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          بيانات الاشتراك
        </h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="رسوم الاشتراك" value={subscriptionFee.toLocaleString()} sub={currency} />
          <InfoCard title="الحصص الشهرية" value={monthlySessions} sub="حصة" />
          <InfoCard title="مدة الحصة" value={lessonDuration} sub="دقيقة" />
          <InfoCard title="سعر الحصة" value={lessonPrice.toFixed(2)} sub={currency} />
        </div>
      </div>

      {/* ملخص التنفيذ */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          ملخص التنفيذ
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="الحصص المسجلة" value={reportsCount} sub="حصة" />
          <InfoCard title="المستحق" value={dueAmount.toFixed(2)} sub={currency} />
          <InfoCard title="الساعات المسجلة" value={completedHours.toFixed(1)} sub="ساعة" />
        </div>
      </div>

      {/* الحالة المالية */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          الحالة المالية
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard title="المدفوع" value={paidAmount.toFixed(2)} sub={currency} />

          <InfoCard
            title={isPaidFull ? "الحالة" : isCredit ? "رصيد للطالب" : "متبقي على الطالب"}
            value={isPaidFull ? "مسدد" : Math.abs(balance).toFixed(2)}
            sub={isPaidFull ? "" : currency}
            status={isPaidFull ? "success" : isCredit ? "success" : "danger"}
          />

          <InfoCard
            title="صافي الحساب"
            value={balance.toFixed(2)}
            sub={currency}
            status={balance >= 0 ? "success" : "danger"}
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, value, sub, status }) {
  const statusClasses = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    danger: "border-red-200 bg-red-50 text-red-900",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${
        status
          ? statusClasses[status]
          : "border-slate-200 bg-slate-50 text-slate-900"
      }`}
    >
      <p className="text-sm opacity-70">{title}</p>

      <div className="mt-3 flex items-end gap-1">
        <h3 className="text-3xl font-black">{value}</h3>

        {sub && (
          <span className="mb-1 text-sm opacity-70">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}