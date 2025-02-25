import { useGlobalContext } from "../../context";
import TermsandConditions from "../TermsandConditions";
import Style from "./Home.module.scss";
import { useRtl } from "../../hooks/useRtl";
import SubscriptionText from "../SubscriptionText";
import LoginForm from "../LoginForm";

const Home = () => {
  const { getTextById } = useGlobalContext();
  const { rtl } = useRtl({Style});
  return (
    <>
      <section className={`${Style.delivery_subscription} ${rtl}`}>
        <div className="section_wrap">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                <SubscriptionText getTextById={getTextById} />
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
            <TermsandConditions
              getTextById={getTextById}
              rtl={rtl}
              Style={Style}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
