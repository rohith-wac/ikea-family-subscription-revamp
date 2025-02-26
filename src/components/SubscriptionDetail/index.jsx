import Style from "./SubscriptionDate.module.scss";

const SubscriptionDetail = ({ getTextById, props, rtl }) => {
  return (
    <div className={`${Style.subdate} ${rtl}`}>
      <div className={Style.box}>
        <h2 className={Style.title}>{getTextById(35)}</h2>
        <p>{props?.data?.end_date || "dd/mm/yyyy"}</p>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
