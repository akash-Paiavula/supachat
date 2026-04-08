"use client";

interface QueryHistoryProps {
  history: string[];
  onSelect: (query: string) => void;
}

export default function QueryHistory({
  history,
  onSelect,
}: QueryHistoryProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h2 className="mb-3 text-lg font-semibold text-white">Query History</h2>

      {history.length === 0 ? (
        <p className="text-sm text-zinc-400">No queries yet.</p>
      ) : (
        <div className="space-y-2">
          {history.map((item, index) => (
            <button
              key={`${item}-${index}`}
              onClick={() => onSelect(item)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-left text-sm text-zinc-200 transition hover:border-blue-500 hover:bg-zinc-800"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}