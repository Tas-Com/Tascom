import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../apis/DeleteAccount";
import { useRouter } from '@tanstack/react-router';
import { useAuth } from "@/modules/Auth/index";

export const useDeleteAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        throw new Error("User not found");
      }

      return deleteUserApi(Number(userId), token);
    },

    onSuccess: () => {
      auth.logout();          // ← امسح localStorage عبر الـ repository
      queryClient.clear();    // ← امسح الـ cache
      router.navigate({ to: "/login" });
    },
  });
};