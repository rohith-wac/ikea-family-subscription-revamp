import { useRtl } from "../../hooks/useRtl";
import Style from "./Home.module.scss";

const Home = () => {
  const { rtl } = useRtl();
  return (
    <>
      <section className={`${Style.delivery_subscription} ${rtl}`}>
        <div className="section_wrap">
          <div className="inner">
            <div className="row">
              {/* <div className={`col-lg-6`}>
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
              </div> */}
            </div>
            {/* <TermsandConditions getTextById={getTextById} /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
