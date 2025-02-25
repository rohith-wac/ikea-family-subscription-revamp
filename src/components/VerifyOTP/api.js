import { getAxiosInstance } from "../../api";

export const verifyOTP = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/otp-verify", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const resendOTP = async (params) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post("/resend-otp", params);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
