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
    // console.log(response.data);
    return response.data;
  },
});
