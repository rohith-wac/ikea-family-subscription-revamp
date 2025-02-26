import { useEffect } from "react";
import { useSwrStatic } from "../helpers/swr";
import { useLocation, useNavigate, useParams } from "react-router-dom/dist";
import i18n from "../i18n";
import { LANGUAGE_CODES } from "../constants/index";
import { getFromLocalStorage, setInLocalStorage } from "../helpers/functions";

const useMenuFooter = () => {
  const { lang: langSlug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // URLs for the header and footer
  const styleUrl = `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${langSlug}&country=qa&fragment=style`;
  const headerUrl = `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${langSlug}&country=qa&fragment=header`;
  const footerUrl = `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${langSlug}&country=qa&fragment=footer-lazy`;
  const scriptUrl = `https://cloudlab.ikea.ae/afgikeapps/corsproxy/ownav.php?lang=${langSlug}&country=qa&fragment=script`;

  // Using useSwrStatic to fetch data
  const { data: styleData } = useSwrStatic(styleUrl, true);
  const { data: headerData } = useSwrStatic(headerUrl, true);
  const { data: footerData } = useSwrStatic(footerUrl, true);
  const { data: scriptData } = useSwrStatic(scriptUrl, true);

  useEffect(() => {
    const storedLang = getFromLocalStorage("language_type") || "en";
    const selectedLang = LANGUAGE_CODES.includes(langSlug) ? langSlug : "en";
    const segments = pathname?.split("/").filter(Boolean);

    if (!langSlug) {
      // append the lang param to the current url
      navigate(`${segments.join("/")}/${storedLang}`, {
        replace: true,
      });
    } else {
      setInLocalStorage("language_type", selectedLang);
      i18n.changeLanguage(selectedLang);
    }
  }, [langSlug, navigate]);

  return { styleData, headerData, footerData, scriptData };
};

export default useMenuFooter;
