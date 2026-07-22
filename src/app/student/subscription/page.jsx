"use client";

import useSWR from "swr";
import { getStudentSubscription } from "@/services//students/student-subscription.service";
import { getClientSession } from "@/lib/auth/session-client";

export default function StudentSubscriptionPage() {
  const session = getClientSession();
  const studentId = session.userId || "1";

  const {
    data: subscription,
    isLoading,
    error,
  } = useSWR(`/students/${studentId}/subscription`, () =>
    getStudentSubscription(studentId)
  );

  if (isLoading) {
    return <p className="text-sm text-slate-500">جاري تحميل الاشتراك...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">تعذر تحميل بيانات الاشتراك.</p>;
  }

  return (
    <section className="space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold text-slate-900">اشتراكي</h1>

      {!subscription ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          لا يوجد اشتراك فعال حاليًا.
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          <p>الرسوم الشهرية: {subscription.subscriptionFee} {subscription.currency}</p>
          <p className="mt-2">عدد الحصص: {subscription.monthlySessions}</p>
          <p className="mt-2">مدة الحصة: {subscription.sessionDuration} دقيقة</p>
        </div>
      )}
    </section>
  );
}
