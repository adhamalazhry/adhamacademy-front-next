export default function DataTable({ columns = [], data = [] }) {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
    >
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse text-right ">
          <thead className="sticky top-0 bg-slate-800 text-white">
            <tr  >
              {columns.map((column) => (
                <th
                  key={column.title}
                  className="whitespace-nowrap px-6 py-4 text-sm font-semibold"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody >
            {data.length === 0 ? (
              <tr >
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-500  "
                >
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-sky-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.title}
                      className="whitespace-nowrap border-t border-slate-100 px-6 py-4 "
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}