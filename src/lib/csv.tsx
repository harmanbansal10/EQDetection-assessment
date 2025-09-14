// src/lib/csv.ts
import Papa from "papaparse";

export type Earthquake = {
  id: string;
  time: number;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number | null;
  magType?: string | null;
  place?: string | null;
  gap?: number | null;
  dmin?: number | null;
  rms?: number | null;
  net?: string | null;
  updated?: number | null;
  [key: string]: string | number | null | undefined;
};

const DEFAULT_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

export async function fetchEarthquakes(url = DEFAULT_URL): Promise<Earthquake[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);

  const csvText = await res.text();


if (csvText.trim().startsWith("<!DOCTYPE html") || csvText.includes("<html")) {
  throw new Error("Received HTML instead of CSV. Check the URL or CORS issues.");
}
  const { data, errors } = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (errors?.length) {
    console.warn("CSV parse warnings:", errors.slice(0, 3));
  }

  return (data as any[]).map((row) => ({
    id: String(row.id ?? row.code ?? crypto.randomUUID()),
    time: Number(row.time),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    depth: Number(row.depth),
    mag: row.mag === "" ? null : Number(row.mag),
    magType: row.magType ?? null,
    place: row.place ?? null,
    gap: row.gap === "" ? null : Number(row.gap),
    dmin: row.dmin === "" ? null : Number(row.dmin),
    rms: row.rms === "" ? null : Number(row.rms),
    net: row.net ?? null,
    updated: row.updated ? Number(row.updated) : null,
    ...row,
  }));
}

