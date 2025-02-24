import useMenuFooter from "../../hooks/useMenuFooter";
import Style from "./Menu.module.scss";

const CommonLayout = () => {
  const { styleData, headerData, footerData, scriptData } = useMenuFooter();
  return (
    <>
      <div className={Style.site_header}>
        {styleData && <div dangerouslySetInnerHTML={{ __html: styleData }} />}
        {headerData && <div dangerouslySetInnerHTML={{ __html: headerData }} />}
      </div>
      <footer className="hnf-footer" role="contentinfo">
        {footerData && <div dangerouslySetInnerHTML={{ __html: footerData }} />}
        {scriptData && <div dangerouslySetInnerHTML={{ __html: scriptData }} />}
      </footer>
    </>
  );
};

export default CommonLayout;
