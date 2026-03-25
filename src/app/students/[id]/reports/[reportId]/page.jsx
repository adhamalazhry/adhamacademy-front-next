import { reports } from "@/data/reports";
import { MemorizationCard } from "@/components/reports/memorization";

export default function ReportPage({ params }) {
  const studentId = Number(params.id);
  const reportId = Number(params.reportId);

  // نجيب التقرير المطلوب
  const report = reports.find(
    (r) => r.id === reportId && r.studentId === studentId
  );

  if (!report) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
        التقرير غير موجود
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <MemorizationCard report={report} index={0} />
    </div>
  );
}