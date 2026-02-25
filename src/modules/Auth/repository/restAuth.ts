import { toUserInformation } from '../adapters/toUserInformation';
import type { AuthRequest, AuthResponse } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';
import type { AuthRepo } from './AuthRepo';
import { apiClient } from '../../../shared/api/client';

export const restAuth = (): AuthRepo => {
  return {
    login: async (request: AuthRequest): Promise<UserInformation> => {
      const responseData = await apiClient.post<AuthResponse>('auth/login', request);
      const user = toUserInformation(responseData);
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("user_id", String(user.id));
      return user;
    },

    register: async (request: AuthRequest) => {
      const responseData = await apiClient.post<AuthResponse>('auth/register', request);
      return toUserInformation(responseData);
    },


    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
    },
  };
};
