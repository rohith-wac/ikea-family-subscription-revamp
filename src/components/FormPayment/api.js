import { getAxiosInstance } from "../../api";

export const paymentInitiate = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/initiate-authentication", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const validateURLSession = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/apple-pay-session", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const apple_pay = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/apple-pay", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
