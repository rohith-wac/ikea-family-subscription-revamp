import Style from "./Summary.module.scss";
import TermsandConditions from "../TermsandConditions";
import useSummary from "./useSummary";
import PaymentSuccess from "../PaymentSuccess";
const OrderSuccess = () => {
  const { t, userData, getTextById } = useSummary();
  return (
    <section className={Style.delivery_subscription}>
      <div className="container">
        <div className="row">
          <PaymentSuccess getTextById={getTextById} t={t} userData={userData} />
        </div>
        <TermsandConditions getTextById={getTextById} />
      </div>
    </section>
  );
};

export default OrderSuccess;
