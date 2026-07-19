export default function DataTable({ columns, data }) {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg text-black"
    >
      <table className="w-full text-right">
        <thead className="bg-slate-800 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.title}
                className="px-6 py-4 text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={`
                border-b border-gray-100
                transition-colors
                hover:bg-sky-50
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              `}
            >
              {columns.map((column) => (
                <td key={column.title} className="px-6 py-4">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
