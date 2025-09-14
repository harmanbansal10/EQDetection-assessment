export type Earthquake = {
id: string; // usgs id
time: number; // epoch ms
latitude: number;
longitude: number;
depth: number; // km
mag: number | null; // magnitude can be null
magType?: string | null;
place?: string | null;
gap?: number | null;
dmin?: number | null;
rms?: number | null;
net?: string | null;
updated?: number | null;
[key: string]: string | number | null | undefined;
};


export type AxisKey = keyof Pick<Earthquake, "mag" | "depth" | "gap" | "dmin" | "rms">;