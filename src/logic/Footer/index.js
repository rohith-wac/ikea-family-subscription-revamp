import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let footerMenu = {};
const useFooter = () => {
  const [footer, setFooter] = useState({ footer: null, script: null });

  const location = useLocation();

  const lang = location.pathname.split("/").includes("ar") ? "ar" : "en";

  useEffect(() => {
    axios
      .get(
        `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${
          !lang ? "en" : lang
        }&country=qa&fragment=footer-lazy`
      )
      .then((resp) => {
        footerMenu.footer = resp?.data;
        setFooter({ ...footerMenu });
      });

    axios
      .get(
        `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${
          !lang ? "en" : lang
        }&country=qa&fragment=script`
      )
      .then((resp) => {
        footerMenu.script = resp?.data;
        setFooter({ ...footerMenu });
      });
  }, [lang]);
  return footer;
};

export default useFooter;
