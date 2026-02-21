import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLanguage, updateLanguage } from "../apis/languageApi";
import i18n from "@/i18n/i18n";

export const useLanguage = () => {
  const queryClient = useQueryClient();

  const { data: currentLanguage, isLoading } = useQuery({
    queryKey: ["language"],
    queryFn: getLanguage,
  });

  const mutation = useMutation({
    mutationFn: updateLanguage,
    onSuccess: (newLanguage) => {
      // حوّل اسم اللغة لكود
      const langCode: Record<string, string> = {
        English: "en",
        Arabic: "ar",
        French: "fr",
        Spanish: "es",
        German: "de",
        Korean: "ko",
        Vietnamese: "vi",
      };

      const code = langCode[newLanguage] || "en";
      i18n.changeLanguage(code);             
      localStorage.setItem("language", code); 

      queryClient.setQueryData(["language"], newLanguage);
    },
  });

  return {
    currentLanguage,
    isLoading,
    updateLanguage: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};