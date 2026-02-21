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
    mutationFn: async () => {
      const token = tokenManager.getToken();
const userId = tokenManager.getUserId();
    

      if (!token || !userId) {
        throw new Error("User not found");
      }

      return deleteUserApi(Number(userId), token);
    },

    onSuccess: () => {
      auth.logout();          
      queryClient.clear();    
      router.navigate({ to: "/login" });
    },
  });
};