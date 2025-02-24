import axios from "axios";
import { parseCookies } from "nookies";

const PRODUCTION = import.meta.env.REACT_APP_PRODUCTION;
const BASE_URL =
  PRODUCTION === "true"
    ? import.meta.env.REACT_APP_APIURL_LIVE
    : import.meta.env.REACT_APP_STAGING_APIURL;

export const getAxiosInstance = async () => {
  const token = parseCookies()?.USER_ACCESS_TOKEN;
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
  instance.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};
