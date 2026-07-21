import Button from "@/components/ui/Button";

export default function SubscriptionActions({
  hasSubscription,
  onOpenForm,
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-900">
        {hasSubscription ? (
          <p>يمكنك تعديل بيانات الاشتراك الحالية للطالب.</p>
        ) : (
          <p>لا يوجد اشتراك للطالب حالياً.</p>
        )}
      </div>

      <Button type="button" className="w-full" onClick={onOpenForm}>
        {hasSubscription ? "تعديل الاشتراك" : "إضافة اشتراك"}
      </Button>
    </div>
  );
}
