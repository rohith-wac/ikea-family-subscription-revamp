import { getAxiosInstance } from "../../api";

export const profileLogin = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/login", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
