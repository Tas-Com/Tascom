import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../index";
import { tokenManager } from "@/shared";

const logoutApi = async () => {
  const token = tokenManager.getToken();
  await fetch("https://tascom.up.railway.app/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    await logoutApi();                         
    auth.logout();                             
    queryClient.clear();                      
    tokenManager.removeToken();
    navigate({ to: "/login" });
  };

  return { handleLogout };
};