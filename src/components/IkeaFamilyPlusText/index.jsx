import Style from "./ikeaFamilyPlusText.module.scss";

const IkeaFamilyPlusText = ({t}) => {
  return (
    <div className={Style.family_text_wrap}>
      <img src="/assets/images/familyIcon.png" alt="family_icon" />
      <h2 className={Style.title}>
        <span>{t("IKEA_FAMILY")}</span> {t("PLUS")}
      </h2>
    </div>
  );
};

export default IkeaFamilyPlusText;
