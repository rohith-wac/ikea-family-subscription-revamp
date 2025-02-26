import { useGlobalContext } from "../../context";
import TermsandConditions from "../TermsandConditions";
import Style from "./Home.module.scss";
import { useRtl } from "../../hooks/useRtl";
import SubscriptionText from "../SubscriptionText";
import LoginForm from "../LoginForm";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { getTextById, basicData } = useGlobalContext();
  const { rtl } = useRtl({ Style });
  const { t } = useTranslation(["common"]);
  return (
    <>
      <section className={`${Style.delivery_subscription} ${rtl}`}>
        <div className="section_wrap">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                <SubscriptionText
                  getTextById={getTextById}
                  rtl={rtl}
                  t={t}
                  amount={basicData?.data?.amount}
                />
                <div className={`${Style.desktop}`}>
                  <LoginForm getTextById={getTextById} />
                </div>
              </div>
              <div className="col-lg-6 ">
                <figure>
                  <img
                    src="/assets/images/subscription-poster.png"
                    alt="poster"
                  />
                </figure>
                <div className={Style.mobile}>
                  <LoginForm getTextById={getTextById} />
                </div>
              </div>
            </div>
            <TermsandConditions getTextById={getTextById} rtl={rtl} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
