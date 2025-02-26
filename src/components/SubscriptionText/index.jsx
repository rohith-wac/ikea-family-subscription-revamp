import Style from "./SubscriptionText.module.scss";
import IkeaFamilyPlusText from "../IkeaFamilyPlusText";

const SubscriptionText = ({ getTextById, rtl, t, amount }) => {
  return (
    <div className={`${Style.subscription} ${rtl}`}>
      <IkeaFamilyPlusText t={t} />
      <h2 className={`h2 ${Style.subtitle}`}>{getTextById(2)}</h2>
      <ul>
        <li>{getTextById(4)}</li>
        <li>{getTextById(5)}</li>
        <li>{getTextById(49)}</li>
      </ul>
      <p>{getTextById(50)}</p>
      <h2 className={`h2 ${Style.sm_title}`}>
        <span className={`${rtl ? Style.amount_ar : Style.amount}`}>
          <span>{getTextById(45)}</span>
          <span>{amount && parseInt(amount)}</span>
        </span>
        /{getTextById(42).toLowerCase()}
      </h2>
    </div>
  );
};

export default SubscriptionText;
