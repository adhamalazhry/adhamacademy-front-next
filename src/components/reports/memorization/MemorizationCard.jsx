import SurahSection from "./SurahSection";
import EvaluationSection from "./EvaluationSection";
import NotesSection from "./NotesSection";

export default function MemorizationCard({ report, index }) {
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
      <div className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-sm text-white shadow">
        الحصة #{index + 1}
      </div>

      <div className="border-b pb-4">
        <h2 className="text-lg font-bold text-gray-900">{report.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{report.date}</p>
      </div>

      <SurahSection
        surah={report.surah}
        from={report.from}
        to={report.to}
      />

      <EvaluationSection evaluation={report.evaluation} />

      <NotesSection note={report.note} />
    </div>
  );
}