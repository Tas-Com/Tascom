import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../apis/DeleteAccount";
import { useRouter } from '@tanstack/react-router';
import { useAuth } from "@/modules/Auth/index";
import { tokenManager } from "@/shared";

export const useDeleteAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
  mutationFn: deleteUserApi,
  
    onSuccess: () => {
      auth.logout();          
      queryClient.clear();    
      router.navigate({ to: "/login" });
    },
  });
};