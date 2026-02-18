import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../index";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    queryClient.clear();
    router.navigate({ to: "/login" });
  };

  return { handleLogout };
};