const BASE_URL = "https://tascom.up.railway.app";

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePasswordApi = async (
  payload: ChangePasswordPayload,
): Promise<void> => {
  const token = localStorage.getItem("access-token");

  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Something went wrong");
  }
};
