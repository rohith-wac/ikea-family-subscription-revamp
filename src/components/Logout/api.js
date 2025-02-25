import { getAxiosInstance } from "../../api";

export const logout = async () => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    return error.response.data;
  }
};
