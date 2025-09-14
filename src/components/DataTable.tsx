// src/components/DataTable.tsx
import { useEffect, useMemo, useRef } from "react";
import { useSelectionContext } from "../context/SelectionContext";
import type { Earthquake } from "../lib/csv"; 

function DataTable({ data }: { data: Earthquake[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedId, setSelectedId } = useSelectionContext();

  const columns = useMemo(() => Object.keys(data[0] ?? {}), [data]);

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setSelectedId(id);
    }
  }, [setSelectedId]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTableSectionElement>) => {
    if (!selectedId) return;
    const idx = data.findIndex((d) => d.id === selectedId);
    if (idx < 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedId(data[Math.min(idx + 1, data.length - 1)].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedId(data[Math.max(idx - 1, 0)].id);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm">
        No data available.
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Data</h2>
        <span className="text-xs opacity-70">Rows: {data.length}</span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto max-h-[600px]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              {columns.map((c) => (
                <th key={c} className="text-left px-3 py-2 whitespace-nowrap font-semibold capitalize">
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody onKeyDown={onKeyDown} tabIndex={0}>
            {data.map((row) => {
              const isSel = row.id === selectedId;
              return (
                <tr
                  id={row.id}
                  key={row.id}
                  className={`${isSel ? "bg-red-50 dark:bg-red-950/40 ring-1 ring-red-500/30" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"} cursor-pointer`}
                  onClick={() => setSelectedId(row.id)}
                >
                  {columns.map((c) => (
                    <td key={c} className="px-3 py-2 whitespace-nowrap border-b border-zinc-100 dark:border-zinc-900">
                      {typeof (row as any)[c] === "number"
                        ? (row as any)[c]?.toFixed(2)
                        : String((row as any)[c] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default DataTable;
