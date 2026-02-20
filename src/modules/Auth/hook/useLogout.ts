import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../index";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    queryClient.clear();
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-id");
    navigate({ to: "/login" });
  };

  return { handleLogout };
};
