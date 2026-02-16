import axios from "axios";

export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );

    const address = response.data.address;
    return (
      address.city ||
      address.town ||
      address.village ||
      address.state ||
      "Unknown Location"
    );
  } catch {
    try {
      const response = await axios.get(
        "https://api.bigdatacloud.net/data/reverse-geocode-client",
        { params: { latitude, longitude } },
      );
      return response.data.city || "Unknown Location";
    } catch {
      return "Unknown Location";
    }
  }
}
