interface ResultsTableProps {
  data: Record<string, unknown>[];
}

export default function ResultsTable({ data }: ResultsTableProps) {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h2 className="mb-3 text-lg font-semibold text-white">Results Table</h2>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-white/10 px-4 py-3 text-left text-zinc-200"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/5">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-zinc-300">
                    {String(row[column] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}