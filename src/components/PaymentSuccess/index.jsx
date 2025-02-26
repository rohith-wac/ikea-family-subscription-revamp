import Style from "./PaymentSuccess.module.scss";
import SubscriptionDetail from "../SubscriptionDetail";
import { useNavigate } from "react-router-dom";
import { useRtl } from "../../hooks/useRtl";

const PaymentSuccess = ({ getTextById, userData }) => {
  const navigate = useNavigate();
  const { rtl } = useRtl({ Style });
  return (
    <div className={Style.root}>
      <h2 className={Style.title}>{getTextById(38)}</h2>
      <div className="d-flex align-items-start justify-content-center gap-1">
        <img src="/assets/success.svg" alt="success" />
        <h6 className={`h6 ${Style.subtitle}`}>{getTextById(37)}</h6>
      </div>
      <div className={`${Style.summary_wrapper}`}>
        <div className={`${Style.order_details}`}>
          <div
            className={`pt-3 col-12 col-sm-6 align-self-center ${Style.items}`}
          >
            <p>
              {getTextById(39)}: #<b>{userData?.data?.order_id}</b>
            </p>
            <p>
              {getTextById(40)}: <b>{userData?.data?.order_date}</b>
            </p>
            <p>
              {getTextById(41)}:
              <b>
                {!rtl && userData?.data?.amount}
                {getTextById(45)}
                {rtl && userData?.data?.amount}
              </b>
            </p>
          </div>
        </div>
        <div className="col-12 col-sm-6 d-flex justify-content-center">
          <SubscriptionDetail getTextById={getTextById} props={userData} />
        </div>
      </div>
      <div className={Style.img_wrap}>
        <figure>
          <img src="/assets/images/subscription-poster.png" alt="poster" />
        </figure>
        <div className={Style.mobile}></div>
      </div>
      <button
        className={`custom_btn custom_btn-primary mt-4 ${Style.btn}`}
        onClick={() => navigate(`/`)}
      >
        {getTextById(36)}
      </button>
    </div>
  );
};

export default PaymentSuccess;
