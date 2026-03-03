export const formatCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    HomeServices: "Home Services",
    Errands: "Errands",
    Repairs: "Repairs",
    PetCare: "Pet Care",
    Transportation: "Transportation",
    Tutoring: "Tutoring",
  };
  return categoryMap[category] || category;
};

export const apiCategories = [
  { value: "Errands", label: "Errands" },
  { value: "Repairs", label: "Repairs" },
  { value: "Tutoring", label: "Tutoring" },
  { value: "PetCare", label: "Pet Care" },
  { value: "HomeServices", label: "Home Services" },
  { value: "Transportation", label: "Transportation" },
];

export const getCategoryValue = (label: string): string => {
  const categoryMap: Record<string, string> = {
    "Errands": "Errands",
    "Repairs": "Repairs",
    "Tutoring": "Tutoring",
    "Pet Care": "PetCare",
    "Home Services": "HomeServices",
    "Transportation": "Transportation",
  };
  return categoryMap[label] || label;
};
