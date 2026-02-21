import { apiClient } from "@/shared/api/client";
import type { UsersRepo } from "./UsersRepo";
import type { User } from "@/modules/Auth/dto/AuthDto";

interface GetUserResponse {
  success: boolean;
  data: User;
}

export const restUsers = (): UsersRepo => ({
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<GetUserResponse>(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: string, data: FormData): Promise<User> => {
    const response = await apiClient.patch<GetUserResponse>(`/users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
});
