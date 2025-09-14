import ChartPanel from "./components/ChartPanel";
import DataTable from "./components/DataTable";
import { fetchEarthquakes, type Earthquake } from "./lib/csv";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["quakes"],
   queryFn: () => fetchEarthquakes(),
  });

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {String(error)}</div>;

  const rows: Earthquake[] = data ?? [];

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-semibold text-xl">Earthquake Explorer</h1>
        <button
          className="text-sm px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onClick={() => {
            const el = document.documentElement;
            el.classList.toggle("dark");
            localStorage.setItem("theme", el.classList.contains("dark") ? "dark" : "light");
          }}
        >
          Toggle theme
        </button>
      </header>

      <main className="h-[calc(100vh-56px)] p-3 grid md:grid-cols-2 gap-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <ChartPanel data={rows} />
        </section>
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <DataTable data={rows} />
        </section>
      </main>
    </div>
  );
}
