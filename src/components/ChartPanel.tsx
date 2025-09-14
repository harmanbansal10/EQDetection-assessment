import { useMemo, useState } from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { AxisSelector } from "./AxisSelector";
import { useSelectionContext } from "../context/SelectionContext";
import { useSelectionStore } from "../store/useSelectionStore";
import type { Earthquake } from "../lib/csv";
type AxisKey = "mag" | "depth" | "gap" | "dmin" | "rms";

function ChartPanel({ data }: { data: Earthquake[] }) {
  const { selectedId, setSelectedId } = useSelectionContext();
  const { filterMagMin } = useSelectionStore();

  const [xKey, setXKey] = useState<AxisKey>("depth");
  const [yKey, setYKey] = useState<AxisKey>("mag");

  const filtered = useMemo(() => {
    const rows =
      filterMagMin == null ? data : data.filter((d) => (d.mag ?? -Infinity) >= filterMagMin);
    return rows.filter((d) => {
      const xv = (d as any)[xKey];
      const yv = (d as any)[yKey];
      return typeof xv === "number" && Number.isFinite(xv) && typeof yv === "number" && Number.isFinite(yv);
    });
  }, [data, filterMagMin, xKey, yKey]);

  const onPointClick = (d: Earthquake) => {
    setSelectedId(d.id);
    location.hash = d.id;
  };

  return (
    <div className="h-full flex flex-col">
      {/* controls bar */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
        <AxisSelector label="X" value={xKey} onChange={setXKey} />
        <AxisSelector label="Y" value={yKey} onChange={setYKey} />
        <MagFilter />
      </div>

      {/* chart area */}
      <div className="flex-1 min-h-[320px] p-3">
        <div className="h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart key={`chart-${xKey}-${yKey}`}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey={xKey} name={xKey} />
              <YAxis type="number" dataKey={yKey} name={yKey} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                key={`${xKey}-${yKey}`}
                data={filtered}
                fill="#8884d8"
                shape={(props: any) => {
                  const { cx = 0, cy = 0, payload } = props as {
                    cx?: number;
                    cy?: number;
                    payload: Earthquake;
                  };
                  const isSel = payload.id === selectedId;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSel ? 8 : 4}
                      fill={isSel ? "#ef4444" : "#8884d8"}
                      style={{ cursor: "pointer" }}
                      onClick={() => onPointClick(payload)}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MagFilter() {
  const { filterMagMin, setFilterMagMin } = useSelectionStore();
  return (
    <label className="text-sm flex items-center gap-2">
      <span className="opacity-70">Min mag</span>
      <input
        type="number"
        step="0.1"
        placeholder="e.g. 2.5"
        className="w-28 px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-zinc-400/40"
        value={filterMagMin ?? ""}
        onChange={(e) =>
          setFilterMagMin(e.target.value === "" ? null : Number(e.target.value))
        }
      />
    </label>
  );
}

export default ChartPanel;
