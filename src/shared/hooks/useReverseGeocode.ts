import { useQueries, useQuery } from "@tanstack/react-query";

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    neighbourhood?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  display_name: string;
}

// --------------- Nominatim throttle queue (1 req / second) ---------------
const THROTTLE_MS = 1100; // slightly over 1 s to stay safe
let lastRequestTime = 0;
const pendingQueue: Array<{
  resolve: (v: string) => void;
  reject: (e: unknown) => void;
  lat: number;
  lon: number;
}> = [];
let processing = false;

function parseLocation(json: NominatimResponse): string {
  const a = json.address;
  const place =
    a.city ?? a.town ?? a.village ?? a.suburb ?? a.neighbourhood ?? a.county;
  const region = a.state ?? a.country;

  if (place && region) return `${place}, ${region}`;
  if (place) return place;
  if (region) return region;

  const parts = json.display_name.split(",").map((s) => s.trim());
  return parts.slice(0, 2).join(", ");
}

async function processQueue() {
  if (processing) return;
  processing = true;

  while (pendingQueue.length > 0) {
    const now = Date.now();
    const wait = THROTTLE_MS - (now - lastRequestTime);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    const item = pendingQueue.shift()!;
    lastRequestTime = Date.now();

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${item.lat}&lon=${item.lon}&format=json`,
        { headers: { "Accept-Language": "en" } },
      );
      if (!res.ok) throw new Error("Nominatim request failed");
      const json: NominatimResponse = await res.json();
      item.resolve(parseLocation(json));
    } catch (err) {
      item.reject(err);
    }
  }

  processing = false;
}

function throttledGeocode(lat: number, lon: number): Promise<string> {
  return new Promise((resolve, reject) => {
    pendingQueue.push({ resolve, reject, lat, lon });
    processQueue();
  });
}

// -------------------------------------------------------------------------

/** Round to 3 decimals (~111 m) so nearby coords share one cache entry. */
const round3 = (n: number) => Math.round(n * 1000) / 1000;

const QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 60 * 24, // 24 h
  gcTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false as const,
  refetchOnMount: false as const,
  refetchOnReconnect: false as const,
  retry: 1,
};

/** Reverse-geocode a single coordinate pair. */
export const useReverseGeocode = (
  latitude: number | null | undefined,
  longitude: number | null | undefined,
) => {
  const lat = latitude != null ? round3(latitude) : null;
  const lon = longitude != null ? round3(longitude) : null;

  const enabled = lat != null && lon != null && !isNaN(lat) && !isNaN(lon);

  const { data, isLoading } = useQuery<string>({
    queryKey: ["reverse-geocode", lat, lon],
    queryFn: () => throttledGeocode(lat!, lon!),
    enabled,
    ...QUERY_OPTIONS,
  });

  return { locationName: data ?? "", isLoading };
};

// -------------------- Batch hook (page-level) ----------------------------

interface Coordinate {
  latitude: number | null | undefined;
  longitude: number | null | undefined;
}

/**
 * Reverse-geocode many coordinate pairs at the page level.
 * React Query deduplicates identical (rounded) keys automatically;
 * the throttle queue ensures Nominatim's 1 req/s limit is respected.
 *
 * Returns a Map keyed by `"roundedLat,roundedLon"` → location name.
 */
export const useBatchReverseGeocode = (coords: Coordinate[]) => {
  // Deduplicate: collect unique rounded coordinate pairs so useQueries
  // never receives duplicate queryKeys (which triggers the warning).
  const uniqueMap = new Map<string, { lat: number; lon: number }>();
  for (const { latitude, longitude } of coords) {
    if (latitude == null || longitude == null) continue;
    const lat = round3(latitude);
    const lon = round3(longitude);
    if (isNaN(lat) || isNaN(lon)) continue;
    const key = `${lat},${lon}`;
    if (!uniqueMap.has(key)) uniqueMap.set(key, { lat, lon });
  }

  const uniqueEntries = Array.from(uniqueMap.entries());

  const queries = uniqueEntries.map(([, { lat, lon }]) => ({
    queryKey: ["reverse-geocode", lat, lon] as const,
    queryFn: () => throttledGeocode(lat, lon),
    enabled: true,
    ...QUERY_OPTIONS,
  }));

  const results = useQueries({ queries });

  const locationMap = new Map<string, string>();
  uniqueEntries.forEach(([key], i) => {
    locationMap.set(key, (results[i]?.data as string) ?? "");
  });

  return locationMap;
};

/** Build a lookup key for the batch map. */
export const locationKey = (
  lat: number | null | undefined,
  lon: number | null | undefined,
) => {
  if (lat == null || lon == null) return "";
  return `${round3(lat)},${round3(lon)}`;
};
