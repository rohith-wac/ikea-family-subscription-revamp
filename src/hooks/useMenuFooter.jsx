import { useEffect } from "react";
import { useSwrStatic } from "../helpers/swr";
import { useNavigate, useParams } from "react-router-dom/dist";
import i18n from "../i18n";

const useMenuFooter = () => {
  const { lang: langSlug } = useParams();
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
    const storedLang = localStorage.getItem("language_type") || "en";
    if (!langSlug) {
      navigate(`/${storedLang}`, { replace: true });
    } else {
      localStorage.setItem("language_type", langSlug);
      i18n.changeLanguage(langSlug);
    }
  }, [langSlug, navigate]);

  return { styleData, headerData, footerData, scriptData };
};

export default useMenuFooter;
