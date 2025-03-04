import { useCallback } from "react";
import { postMethodInstance } from "../Subscription/api";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFromLocalStorage } from "../../helpers/functions";
const useFormPayment = ({ userData, Frames }) => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
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

  const formik = useFormik({
    initialValues: {
      cardholderName: "",
    },
    validationSchema: Yup.object({
      cardholderName: Yup.string().required(),
    }),
    onSubmit: () => {
      Frames.submitCard();
    },
  });

  return {
    handleOnCardTokenized,
    t,
    REACT_APP_CHECKOUT_PUBLIC_KEY,
    formik,
    lang,
  };
};

export default useFormPayment;
