export default function SubscriptionDetails({ subscription }) {
  if (!subscription) {
    return (
      <div className="min-w-0 text-right">
        <p className="mb-0.5 text-[11px] font-medium text-slate-400">
          الاشتراك
        </p>
        <p className="truncate text-sm font-semibold text-slate-500">
          لا يوجد اشتراك
        </p>
      </div>
    );
  }

  const feeValue = Number(subscription.subscriptionFee);
  const formattedFee = Number.isFinite(feeValue)
    ? feeValue.toLocaleString()
    : "-";

  return (
    <div className="min-w-0 text-right">
      <p className="mb-1 text-[11px] font-medium text-slate-400">
        الاشتراك
      </p>

      <div className="space-y-0.5 text-xs text-slate-700">
        <p className="truncate font-semibold text-slate-900">
          الرسوم الشهرية: {formattedFee} {subscription.currency || ""}
        </p>
        <p className="truncate">
          عدد الحصص: {subscription.monthlySessions || "-"}
        </p>
        <p className="truncate">
          مدة الحصة: {subscription.sessionDuration || "-"} دقيقة
        </p>
      </div>
    </div>
  );
}
