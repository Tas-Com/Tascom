import { useQuery } from "@tanstack/react-query";
import { tokenManager } from "../../../shared/api/client";
import type { UserInformation } from "../entities/Auth";
import { AuthKey } from "./useRegister";
import { apiClient } from "../../../shared/api/client";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [AuthKey, "current"],
    queryFn: async (): Promise<UserInformation> => {
      return apiClient.get<UserInformation>("/auth/me");
    },
    enabled: tokenManager.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useIsAuthenticated = () => {
  return tokenManager.isAuthenticated();
};
