import { toUserInformation } from '../adapters/toUserInformation';
import type { AuthRequest, AuthResponse } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';
import type { AuthRepo } from './AuthRepo';
import { apiClient, tokenManager } from '../../../shared/api/client';

export const restAuth = (): AuthRepo => {
  return {
    login: async (request: AuthRequest): Promise<UserInformation> => {
      const responseData = await apiClient.post<AuthResponse>('auth/login', request);
      const user = toUserInformation(responseData);
      tokenManager.setToken(user.access_token);    
      tokenManager.setUserId(String(user.id));
      tokenManager.setRole(user.role);
      return user;
    },

    register: async (request: AuthRequest) => {
      const responseData = await apiClient.post<AuthResponse>('auth/register', request);
      return toUserInformation(responseData);
    },


    logout: () => {
      tokenManager.removeToken(); 
    },
  };
};
