import { createContext, useCallback, useContext } from "react";
import { useSwrStatic } from "../helpers/swr.js";
import { useLocation } from "react-router-dom";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const { pathname } = useLocation();
  
  // Fetch the cms content dynamcally
  const {
    data: { data: cmsContent = [] } = {},
    error,
    isLoading,
  } = useSwrStatic(`/get-content/?language=${pathname.includes("/ar") ? "ar" : "en"}`);

  // Get respective contents according the id
  const getTextById = useCallback(
    (id) => {
      const item = cmsContent?.find((entry) => entry?.id === id);
      return item?.value ?? "";
    },
    [cmsContent]
  );
  return (
    // Supplied values to the child elements using the provider
    <GlobalContext.Provider
      value={{ data: cmsContent, error, isLoading, getTextById }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook for Consuming the Context
const useGlobalContext = () => useContext(GlobalContext);

export default Context;
export { useGlobalContext };
