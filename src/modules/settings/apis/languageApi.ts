// settings/apis/language.api.ts

export const getLanguage = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("English"); // اللغة الافتراضية
    }, 500);
  });
};

export const updateLanguage = async (
  language: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(language);
    }, 500);
  });
};
