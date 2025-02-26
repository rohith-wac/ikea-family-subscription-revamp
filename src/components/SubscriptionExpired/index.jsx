import Style from "./SubscriptionText.module.scss";

const SubscriptionExpired = ({ getTextById }) => {
  return (
    <div className={Style.subscription}>
      <h2 className={Style.title}>{getTextById(18)}</h2>
      <h2 className={`h2 ${Style.subtitle}`}>{getTextById(19)}</h2>
    </div>
  );
};

export default SubscriptionExpired;
