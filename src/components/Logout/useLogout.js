import { destroyCookie, parseCookies } from "nookies";
import { logout } from "./api";
import Style from "./logout.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRtl } from "../../hooks/useRtl";
import { setInLocalStorage } from "../../helpers/functions";
const useLogout = () => {
  const token = true;
  // const token = parseCookies()?.USER_ACCESS_TOKEN;
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useTranslation(["common"]);
  const { rtl } = useRtl({ Style });

  const handleLogout = () => {
    logout()
      .then(() => {
        destroyCookie(null, "USER_ACCESS_TOKEN", { path: "/" });
        navigate(`/${lang}`);
        localStorage.clear();
        setInLocalStorage("language_type", lang);
      })
      .catch((err) => {
        console.log("failed to logout", err);
      });
  };
  
  return { token, handleLogout, t, rtl };
};

export default useLogout;
