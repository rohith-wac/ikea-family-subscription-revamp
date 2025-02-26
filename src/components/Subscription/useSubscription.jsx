import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSwrData } from "../../helpers/swr";
import { postMethodInstance } from "./api";
import { useGlobalContext } from "../../context";
import { useRtl } from "../../hooks/useRtl";
import SubscriptionText from "../SubscriptionText";
import SubscriptionExpired from "../SubscriptionExpired";
import SubscriptionSuccess from "../SubscriptionSuccess";
import SubscriptionDate from "../SubscriptionDate";

const useSubscription = ({ Style }) => {
  const { lang } = useParams();
  const [orderId, setOrderId] = useState(null);
  const { getTextById, basicData } = useGlobalContext();
  const { rtl } = useRtl({ Style });

  const { data: userData } = useSwrData(`/user-details`, {
    language: lang,
  });
  // create an order
  if (userData?.data?.payment_option == 1) {
    postMethodInstance("create-order", { language: lang })
      .then((data) => {
        setOrderId(data?.data?.id);
        localStorage.setItem("id", data?.data?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Return the subscription based on the payment status
  const SubscriptionType = ({ props }) => {
    switch (userData?.data?.payment_option) {
      case "1":
        return <SubscriptionText getTextById={getTextById} />;
      case "2":
        return <SubscriptionExpired getTextById={getTextById} />;
      case "0":
        return <SubscriptionSuccess getTextById={getTextById} />;
      default:
        return <SubscriptionDate getTextById={getTextById} props={props} />;
    }
  };

  return {
    userData,
    basicData,
    orderId,
    rtl,
    SubscriptionType,
  };
};

export default useSubscription;
