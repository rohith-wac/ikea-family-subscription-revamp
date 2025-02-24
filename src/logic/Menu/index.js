import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let menu = {};
const useMenu = () => {
  const [header, setHeader] = useState({ header: null, style: null });
  const location = useLocation();

  const lang = location.pathname.split("/").includes("ar") ? "ar" : "en";
  useEffect(() => {
    axios
      .get(
        `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${
          !lang ? "en" : lang
        }&country=qa&fragment=style`
      )
      .then((resp) => {
        menu.style = resp?.data;
        setHeader({ ...menu });
      });

    axios
      .get(
        `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${
          !lang ? "en" : lang
        }&country=qa&fragment=header`
      )
      .then((resp) => {
        menu.header = resp?.data;
        setHeader({ ...menu });
      });
  }, [lang]);

  return header;
};

export default useMenu;
