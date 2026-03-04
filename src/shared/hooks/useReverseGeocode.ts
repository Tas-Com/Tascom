import { useQuery } from "@tanstack/react-query";

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

export const useReverseGeocode = (
    latitude: number | null | undefined,
    longitude: number | null | undefined,
) => {
    const enabled =
        latitude != null &&
        longitude != null &&
        !isNaN(latitude) &&
        !isNaN(longitude);

    const { data, isLoading } = useQuery<string>({
        queryKey: ["reverse-geocode", latitude, longitude],
        queryFn: async () => {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                { headers: { "Accept-Language": "en" } },
            );
            if (!res.ok) throw new Error("Nominatim request failed");
            const json: NominatimResponse = await res.json();

            const a = json.address;
            const place =
                a.city ?? a.town ?? a.village ?? a.suburb ?? a.neighbourhood ?? a.county;
            const region = a.state ?? a.country;

            if (place && region) return `${place}, ${region}`;
            if (place) return place;
            if (region) return region;

            // Last resort: first two comma-separated parts of display_name
            const parts = json.display_name.split(",").map((s) => s.trim());
            return parts.slice(0, 2).join(", ");
        },
        enabled,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });

    return { locationName: data ?? "", isLoading };
};
