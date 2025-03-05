import useSWRImmutable from "swr/immutable";
import { getAxiosInstance } from "../api";
import useSWRMutation from "swr/mutation";

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

const mutationFetcher = async ([url, method], { arg }) => {
  const api = await getAxiosInstance();
  return api[method](url, arg).then((res) => res.data);
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

// Custom SWR mutation hook
export const useSwrMutate = (path, method = "post", options = {}) => {
  const url = `${baseUrl}${path}`;

  const { trigger, data, error, isMutating } = useSWRMutation(
    path ? [url, method] : null,
    mutationFetcher,
    {
      ...options,
    }
  );

  return {
    trigger,
    data,
    isError: error,
    isMutating,
  };
};
