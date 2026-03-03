export interface LocationOption {
  value: string;
  label: string;
  latitude: number;
  longitude: number;
}

const palestineLocations: LocationOption[] = [
  { value: "gaza", label: "Gaza", latitude: 31.5, longitude: 34.4667 },
  { value: "ramallah", label: "Ramallah", latitude: 31.9, longitude: 35.2 },
  { value: "hebron", label: "Hebron", latitude: 31.53, longitude: 35.1 },
  { value: "nablus", label: "Nablus", latitude: 32.22, longitude: 35.25 },
  { value: "jenin", label: "Jenin", latitude: 32.46, longitude: 35.3 },
  { value: "bethlehem", label: "Bethlehem", latitude: 31.7, longitude: 35.2 },
  { value: "tulkarm", label: "Tulkarm", latitude: 32.31, longitude: 35.0 },
  { value: "qalqilya", label: "Qalqilya", latitude: 32.19, longitude: 34.97 },
  { value: "salfit", label: "Salfit", latitude: 32.08, longitude: 35.16 },
  { value: "jericho", label: "Jericho", latitude: 31.85, longitude: 35.44 },
];

const otherLocations: LocationOption[] = [
  { value: "amman", label: "Amman, Jordan", latitude: 31.95, longitude: 35.93 },
  { value: "cairo", label: "Cairo, Egypt", latitude: 30.04, longitude: 31.24 },
  { value: "dubai", label: "Dubai, UAE", latitude: 25.2, longitude: 55.27 },
  { value: "riyadh", label: "Riyadh, Saudi Arabia", latitude: 24.71, longitude: 46.67 },
  { value: "beirut", label: "Beirut, Lebanon", latitude: 33.89, longitude: 35.5 },
];

export const getLocationOptions = (): LocationOption[] => {
  return [...palestineLocations, ...otherLocations];
};

export const getPalestineLocations = (): LocationOption[] => {
  return palestineLocations;
};

export const getLocationByValue = (value: string): LocationOption | undefined => {
  const allLocations = getLocationOptions();
  return allLocations.find((loc) => loc.value === value);
};
