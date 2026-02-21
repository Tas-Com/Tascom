import axios from "axios";

const BaseUrl = "https://tascom.up.railway.app/";

export const deleteUserApi = async (userId: number, token: string) => {
  const response = await axios.delete(`${BaseUrl}users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
