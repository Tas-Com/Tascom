import { apiClient } from "@/shared/api/client";

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const changePasswordApi = async (
  payload: ChangePasswordPayload
): Promise<void> => {
  return apiClient.post("auth/change-password", payload);
};



