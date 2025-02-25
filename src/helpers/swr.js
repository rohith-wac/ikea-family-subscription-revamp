import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import { getAxiosInstance } from "../api";

const PRODUCTION = import.meta.env.VITE_REACT_APP_PRODUCTION;
const baseUrl =
  PRODUCTION === "true"
    ? import.meta.env.VITE_REACT_APP_APIURL_LIVE
    : import.meta.env.VITE_REACT_APP_STAGING_APIURL;

export const fetcher = async (url) => {
  const api = await getAxiosInstance();
  return api.get(url).then((res) => res.data);
};

export const fetcherPost = async ([url, payload]) => {
  const api = await getAxiosInstance();
  return api.post(url, payload).then((res) => res.data);
};

export const useSwrStatic = (path, customDomain = false, options = {}) => {
  const url = path ? `${!customDomain ? baseUrl : ""}${path}` : null;
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    url,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
          error.response?.status === 404 ||
          error.response?.status === 401 ||
          error.response?.status === 400 ||
          error.response?.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      loadingTimeout: 10000,
      revalidateFirstPage: false,
      refreshInterval: 1000 * 60 * 60,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
};

export const useSwrData = (path, payload = {}, options = {}) => {
  const url = `${baseUrl}${path}`;
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    path ? [url, payload] : null,
    async ([url, args]) => {
      const api = await getAxiosInstance();
      return api.post(url, args).then((res) => res.data);
    },
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
          error.response.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      loadingTimeout: 10000,
      revalidateFirstPage: false,
      refreshInterval: 1000 * 60 * 60,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    mutate,
  };
};

export const useSwrInfiniteData = (getPathKey = () => {}, options = {}) => {
  const getKey = (pageIndex) => {
    return `${baseUrl}${getPathKey(pageIndex)}`;
  };
  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(getKey, fetcher, {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
          error.response.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      loadingTimeout: 10000,
      revalidateFirstPage: false,
      keepPreviousData: true,
      refreshInterval: 1000 * 60 * 60,
      ...options,
    });

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    size,
    setSize,
    mutate,
  };
};

export const useSwrInfinitePayload = (
  getPathKey = () => {},
  options = {},
  payload = {}
) => {
  const getKey = (pageIndex) => {
    return [`${baseUrl}${getPathKey(pageIndex)}`, payload];
  };

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(getKey, fetcherPost, {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
          error.response.status === 404 ||
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 405
        ) {
          return;
        }
        if (retryCount <= 3) {
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
      loadingTimeout: 10000,
      revalidateFirstPage: false,
      refreshInterval: 1000 * 60 * 60,
      ...options,
    });

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
