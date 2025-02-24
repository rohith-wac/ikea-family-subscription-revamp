import { useLocation } from "react-router-dom";

export const useRtl = ({ Style }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const myClass = currentPath.endsWith("/ar");
  const rtl = myClass ? Style.rtl : "";
  return { rtl };
};
