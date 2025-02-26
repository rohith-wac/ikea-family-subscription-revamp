import Style from "./SubscriptionText.module.scss";

const SubscriptionSuccess = ({ getTextById }) => {
  return (
    <div className={Style.subscription}>
      <h2 className={Style.title}>{getTextById(1)}</h2>
      <div className="d-flex align-items-start">
        <img src="/assets/success.svg" alt="success" />
        <h2 className={`h2 ${Style.subtitle}`}>{getTextById(34)}</h2>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
