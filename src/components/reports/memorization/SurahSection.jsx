export default function SurahSection({ surah, from, to }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 space-y-4">
      <div>
        <p className="mb-1 text-sm text-blue-600">🕌 السورة</p>
        <h2 className="text-2xl font-bold text-gray-900">{surah}</h2>
      </div>

      <div className="h-[1px] bg-blue-200"></div>

      <div>
        <p className="mb-2 text-sm text-gray-500">📌 الآيات</p>

        <div className="flex items-center justify-center gap-4 text-lg font-semibold text-gray-800">
          <span className="rounded-lg bg-white px-4 py-2 shadow-sm">
            من آية {from}
          </span>

          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-blue-300 to-blue-500"></div>

          <span className="rounded-lg bg-white px-4 py-2 shadow-sm">
            إلى آية {to}
          </span>
        </div>
      </div>
    </div>
  );
}