import { AxisKey } from "../types";


const OPTIONS: { key: AxisKey; label: string }[] = [
{ key: "mag", label: "Magnitude (mag)" },
{ key: "depth", label: "Depth (km)" },
{ key: "gap", label: "Gap" },
{ key: "dmin", label: "Distance Min (dmin)" },
{ key: "rms", label: "RMS" }
];


export function AxisSelector({ value, onChange, label }: { value: AxisKey; onChange: (k: AxisKey) => void; label: string }) {
return (
<label className="text-sm flex items-center gap-2">
<span className="opacity-70 w-6">{label}</span>
<select className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent" value={value}
onChange={(e) => onChange(e.target.value as AxisKey)}>
{OPTIONS.map((o) => (
<option key={o.key} value={o.key}>{o.label}</option>
))}
</select>
</label>
);
}