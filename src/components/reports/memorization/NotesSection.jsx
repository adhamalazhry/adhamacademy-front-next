export default function NotesSection({ note }) {
  return (
    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
      
      <p className="text-sm text-amber-700 mb-2">
        📝 ملاحظات
      </p>

      <p className="text-gray-800 leading-7">
        {note}
      </p>

    </div>
  );
}