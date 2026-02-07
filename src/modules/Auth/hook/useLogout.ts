import { useMutation } from "@tanstack/react-query";
import { useAuth } from "..";
import { queryClient } from "../../../main";
import { AuthKey } from "./useRegister";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [AuthKey] });
      navigate({ to: "/login" });
    },
  });
};
