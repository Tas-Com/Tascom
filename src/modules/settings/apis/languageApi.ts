export const getLanguage = async (): Promise<string> => {

  return localStorage.getItem("language") === "ar" ? "Arabic"
    : localStorage.getItem("language") === "fr" ? "French"
    : localStorage.getItem("language") === "es" ? "Spanish"
    : localStorage.getItem("language") === "de" ? "German"
    : localStorage.getItem("language") === "ko" ? "Korean"
    : localStorage.getItem("language") === "vi" ? "Vietnamese"
    : "English";
};

export const updateLanguage = async (language: string): Promise<string> => {
  return language; 
};