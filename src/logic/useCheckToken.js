import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckToken = () => {
  const navigate = useNavigate();
  const getToken = () => {
    return parseCookies();
  };
  useEffect(() => {
    const checkToken = async () => {
      const cookies = getToken();
      if (!cookies.USER_ACCESS_TOKEN) {
        navigate("/");
      }
    };

    checkToken();
  }, [navigate]);
  return { getToken };
};

export default useCheckToken;
