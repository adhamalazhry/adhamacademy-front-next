export default function StudentHomePage() {
  return (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-xl font-bold text-gray-900">مرحبًا بك</h2>
        <p className="mt-2 text-gray-600">
          هذه صفحتك الخاصة، يمكنك من هنا متابعة بياناتك وتقاريرك والاشتراك الخاص بك.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard title="آخر تقرير" value="ممتاز" />
        <InfoCard title="الاشتراك الحالي" value="12 حصة" />
        <InfoCard title="المعلم" value="الشيخ أحمد" />
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}