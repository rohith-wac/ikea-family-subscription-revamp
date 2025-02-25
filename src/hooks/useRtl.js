import { useLocation } from "react-router-dom";

export const useRtl = ({ Style }) => {
  const { pathname } = useLocation();

  const myClass = pathname.endsWith("/ar");
  const rtl = myClass && Style?.rtl;
  return { rtl };
};
