// settings/hooks/useLanguage.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLanguage, updateLanguage } from "../apis/languageApi";

export const useLanguage = () => {
  const queryClient = useQueryClient();


  const { data: currentLanguage, isLoading } = useQuery({
    queryKey: ["language"],
    queryFn: getLanguage,
  });

  
  const mutation = useMutation({
    mutationFn: updateLanguage,
    onSuccess: (newLanguage) => {
    
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
