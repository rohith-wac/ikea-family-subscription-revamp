import { getAxiosInstance } from "../../api";

export const getMethodInstance = async (route, params) => {  
  try {
    const api = await getAxiosInstance();
    const res = await api.get(`/${route}`, params);
    const data = res.data;
    return data;
  } catch (error) {
    return {
      data: {
        status: "Not Found",
        err: JSON.stringify(error),
      },
    };
  }
};
export const postMethodInstance = async (route, params) => {
  try {
    const api = await getAxiosInstance();
    const res = await api.post(`/${route}`, params);
    const data = res.data;
    return data;
  } catch (error) {
    return {
      data: {
        status: "Not Found",
        err: JSON.stringify(error),
      },
    };
  }
};
