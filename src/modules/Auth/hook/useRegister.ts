import { useMutation } from "@tanstack/react-query";
import { useAuth } from "..";
import type { RegisterRequest } from "../dto/AuthDto";
import { queryClient } from "../../../main";

export const AuthKey = "Auth";

export const useRegister = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: (request: RegisterRequest) => auth.register(request),
    onSuccess: (data) => {
      queryClient.setQueryData([AuthKey], data);
    },
  });
};
