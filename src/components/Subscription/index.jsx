import Style from "./Subscription.module.scss";
import useSubscription from "./useSubscription";
const Subscription = () => {
  const { userData, basicData, orderId, rtl, SubscriptionType } =
    useSubscription({ Style });
  return (
    <>
      <section className={`${Style.delivery_subscription} ${rtl}`}>
        <div className="section_wrap">
          <div className="inner">
            <div className={`row`}>
              <div className={`col-lg-6`}>
                <SubscriptionType props={userData} rtl={rtl} />
                <div className="d-block d-lg-none">
                  <figure className={Style.figure}>
                    <img
                      src="/assets/images/subscription-poster.png"
                      alt="poster"
                    />
                  </figure>
                </div>
                {/* <FormPayment
                  userData={userData}
                  basicData={basicData}
                  orderId={orderId}
                /> */}
              </div>
              <div className="col-lg-6">
                <div className="d-none d-lg-block">
                  <figure className={Style.figure}>
                    <img
                      src="/assets/images/subscription-poster.png"
                      alt="poster"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscription;
