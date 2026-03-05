import { useState, useEffect } from "react";
import { getLocation } from "../utils/getLocation";
import type { LocationResult } from "../utils/getLocation";

const LOCATION_CACHE_KEY = "tascom_user_location";
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

export function useLocation() {
    const [location, setLocation] = useState<LocationResult | null>(() => {
        const cached = localStorage.getItem(LOCATION_CACHE_KEY);
        if (cached) {
            try {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_EXPIRY) {
                    return data;
                }
            } catch (e) {
                console.error("Failed to parse cached location", e);
            }
        }
        return null;
    });

    const refreshLocation = async (skipCity: boolean = true) => {
        try {
            const newLocation = await getLocation(skipCity);
            setLocation(newLocation);
            localStorage.setItem(
                LOCATION_CACHE_KEY,
                JSON.stringify({ data: newLocation, timestamp: Date.now() }),
            );
            return newLocation;
        } catch (error) {
            console.error("Failed to fetch location", error);
            return null;
        }
    };

    useEffect(() => {
        if (!location) {
            refreshLocation(true);
        }
    }, []);

    return { location, refreshLocation };
}
