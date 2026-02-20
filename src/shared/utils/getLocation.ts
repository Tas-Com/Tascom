import axios from "axios";

export type LocationResult = {
  latitude: number;
  longitude: number;
  city: string;
};

export async function getLocation(): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const address = response.data.address;
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.state ||
            "Unknown Location";

          resolve({ latitude, longitude, city });
        } catch {
          // fallback to coordinates if reverse fails
          resolve({
            latitude,
            longitude,
            city: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          });
        }
      },
      async () => {
        // IP fallback
        try {
          const response = await axios.get(
            "https://api.bigdatacloud.net/data/reverse-geocode-client",
          );
          const { city, latitude, longitude } = response.data;

          if (!city) throw new Error("Invalid IP response");

          resolve({ latitude, longitude, city });
        } catch (err) {
          reject(err);
        }
      },
    );
  });
}
