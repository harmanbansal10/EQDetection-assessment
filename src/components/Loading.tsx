export default function Loading({ label = "Loading…" }: { label?: string }) {
    return (
        <div className="p-6 text-sm opacity-75">
            <span className="animate-pulse">{label}</span>
        </div>
    );
}