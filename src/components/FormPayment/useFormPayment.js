import { useCallback, useRef } from "react";
import { postMethodInstance } from "../Subscription/api";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage } from "../../helpers/functions";
import { useRtl } from "../../hooks/useRtl";
const useFormPayment = ({ Style, Frames, basicData }) => {
  const formApiRef = useRef();
  const { lang } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const { rtl } = useRtl({ Style });
  const order_id = getFromLocalStorage("order_id");

  const PRODUCTION = import.meta.env.VITE_REACT_APP_PRODUCTION;
  const REACT_APP_CHECKOUT_PUBLIC_KEY =
    PRODUCTION === "true"
      ? import.meta.env.VITE_REACT_APP_CHECKOUT_PUBLIC_KEY
      : import.meta.env.VITE_REACT_APP_CHECKOUT_PUBLIC_KEY_TEST;

  const handleOnCardTokenized = useCallback(
    async (data) => {
      try {
        const payload = {
          token: data?.token,
          card_type: data?.card_type,
          issuer_country: data?.issuer_country,
          scheme: data?.scheme,
          card_no: data?.last4,
          order_id: order_id,
        };
        const { data: responseData } = await postMethodInstance(
          "create-payment-link",
          payload
        );

        if (responseData?.status === "Pending") {
          window.location.href = responseData?._links?.redirect?.href;
        } else if (responseData?.approved) {
          navigate(`/order-summary/${order_id}/success/${lang}`);
        } else {
          navigate(`/order-summary/${order_id}/failed/${lang}`);
        }
      } catch (error) {
        console.log("On Card Tokenized Callback handler Error: ", error);
      }
    },
    [order_id, lang, navigate]
  );

  const handleSubmit = () => {
    Frames.submitCard();
  };

  const showCardType = basicData?.data?.card_payment === "1";

  return {
    handleOnCardTokenized,
    t,
    REACT_APP_CHECKOUT_PUBLIC_KEY,
    lang,
    rtl,
    handleSubmit,
    showCardType,
    formApiRef,
  };
};

export default useFormPayment;
