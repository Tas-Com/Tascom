import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "..";
import type { AuthRequest } from "../dto/AuthDto";
import { AuthKey } from "./useRegister";

export const useLogin = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: AuthRequest) => auth.login(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      throw error;
    },
  });
};
