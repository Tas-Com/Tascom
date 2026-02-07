import { toUserInformation } from "../adapters/toUserInformation";
import type {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
} from "../dto/AuthDto";
import type { UserInformation } from "../entities/Auth";
import type { AuthRepo } from "./AuthRepo";
import { apiClient, tokenManager } from "../../../shared/api/client";

export const restAuth = (): AuthRepo => {
  return {
    login: async (request: AuthRequest): Promise<UserInformation> => {
      const response = await apiClient.post<AuthResponse>(
        "auth/login",
        request
      );

      if (response.success && response.data.token) {
        tokenManager.setToken(response.data.token);
      }

      return toUserInformation(response);
    },

    register: async (request: RegisterRequest): Promise<UserInformation> => {
      const response = await apiClient.post<AuthResponse>(
        "auth/register",
        request
      );

      if (response.success && response.data.token) {
        tokenManager.setToken(response.data.token);
      }

      return toUserInformation(response);
    },

    logout: async (): Promise<void> => {
      try {
        await apiClient.post("auth/logout");
      } finally {
        tokenManager.removeToken();
      }
    },
  };
};
