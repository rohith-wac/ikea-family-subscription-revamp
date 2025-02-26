import Style from "./SubscriptionDate.module.scss";

const SubscriptionDate = ({ getTextById, props, rtl }) => {
  return (
    <div className={`${Style.subdate} ${rtl}`}>
      <div className={Style.box}>
        <h2 className={Style.title}>{getTextById(16)}</h2>
        <p>{props?.data?.start_date}</p>
      </div>
      <div className={Style.separator}></div>
      <div className={Style.box}>
        <h2 className={Style.title}>{getTextById(17)}</h2>
        <p>{props?.data?.end_date || "dd/mm/yyyy"}</p>
      </div>
    </div>
  );
};

export default SubscriptionDate;
