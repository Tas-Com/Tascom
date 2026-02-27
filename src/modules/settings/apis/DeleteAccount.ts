import { apiClient, tokenManager } from "@/shared/api/client";

export const deleteUserApi = async (): Promise<void> => {
  const userId = tokenManager.getUserId();
  if (!userId) throw new Error("User not found");

  return apiClient.delete(`users/${userId}`);
};