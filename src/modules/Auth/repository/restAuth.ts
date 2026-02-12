import { toUserInformation } from '../adapters/toUserInformation';
import type { AuthRequest, AuthResponse } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';
import type { AuthRepo } from './AuthRepo';
import axios from 'axios';

const BaseUrl = 'https://tascom.up.railway.app/';
export const restAuth = (): AuthRepo => {
  return {
    login: async (request: AuthRequest): Promise<UserInformation> => {
      const response = await axios.post<AuthResponse>(`${BaseUrl}auth/login`, request);
      return toUserInformation(response.data);
    },
    register: async (request: AuthRequest) => {
      const response = await axios.post<AuthResponse>(`${BaseUrl}auth/register`, request);
      console.log(response);
      return toUserInformation(response.data);
    },
  };
};
