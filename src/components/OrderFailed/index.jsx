import Style from "./Summary.module.scss";
import TransactionFailed from "./transaction-failed.svg";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { getFromLocalStorage } from "../../helpers/functions";

const OrderFailed = () => {
  const { getTextById } = useGlobalContext();
  const navigate = useNavigate();
  const lang = getFromLocalStorage("language_type");
  return (
    <section className={Style.delivery_subscription}>
      <div className="container">
        <div className="row">
          <div className={`col-lg-6 ${Style.failedClass}`}>
            <div className={`${Style.desktop}`}>
              <div className={Style.contentWrapper}>
                <div className={Style.fig_wrapper}>
                  <figure className={Style.fig_img_wrapper}>
                    <img src={TransactionFailed} alt="Transaction Failed" />
                  </figure>
                </div>
                <div className={Style.message_title}>{getTextById(46)}</div>
                <div className={`${Style.message_status} ${Style.error}`}>
                  {getTextById(47)}
                </div>
                <button
                  className={"custom_btn custom_btn-primary"}
                  onClick={() => navigate(`/subscription/${lang}`)}
                >
                  {getTextById(48)}
                </button>
                <button
                  className={"custom_btn custom_btn-primary"}
                  onClick={() => navigate(`/${lang}`)}
                >
                  {getTextById(36)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFailed;
