  import { createContext, useCallback } from "react";
  import { useSwrStatic } from "../helpers/swr.js";
  import { useLocation } from "react-router-dom";

  export const GlobalContext = createContext();
  const Context = ({ children }) => {
    const location = useLocation();

    const {
      data: { data: cmsContent = {} },
      error,
      isLoading,
    } = useSwrStatic(
      `/get-content/?language=${location.pathname.includes("/ar") ? "ar" : "en"}`
    );

    const getTextById = useCallback(
      (id) => {
        const item = cmsContent?.find((entry) => entry.id === id);
        return item ? item.value : "";
      },
      [cmsContent]
    );

    return (
      <GlobalContext.Provider
        value={{ data: cmsContent, error, isLoading, getTextById }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };

  export default Context;
