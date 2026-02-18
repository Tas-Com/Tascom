// settings/hooks/useLanguage.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLanguage, updateLanguage } from "../apis/languageApi";

export const useLanguage = () => {
  const queryClient = useQueryClient();

  // 🔹 جلب اللغة الحالية
  const { data: currentLanguage, isLoading } = useQuery({
    queryKey: ["language"],
    queryFn: getLanguage,
  });

  // 🔹 تحديث اللغة
  const mutation = useMutation({
    mutationFn: updateLanguage,
    onSuccess: (newLanguage) => {
      // تحديث الكاش
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
