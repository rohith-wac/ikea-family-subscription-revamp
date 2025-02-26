import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apple_pay, validateURLSession } from "./api";
import { parseCookies } from "nookies";

const useApplePay = () => {
  const [appleErrorMessage, setAppleErrorMessage] = useState(false);
  const { t } = useTranslation(["common"]);
  const { lang } = useParams();
  const navigate = useNavigate();
  const { ApplePaySession } = window;

  const REACT_APP_APPLE_PAY_MERCHENT = import.meta.env
    .VITE_REACT_APP_APPLE_PAY_MERCHENT;

  useEffect(() => {
    if (ApplePaySession) {
      const promise = ApplePaySession.canMakePaymentsWithActiveCard(
        REACT_APP_APPLE_PAY_MERCHENT
      );

      promise.then(
        (canMakePayments) => {
          if (canMakePayments) {
            console.log("Apple Pay Button rendered");
            console.log(canMakePayments, "if canMakePayments");
          } else {
            setAppleErrorMessage(t("Error_Msg_1"));
            console.log(canMakePayments, "else1 canMakePayments");
          }
        },
        (error) => {
          setAppleErrorMessage(t("Error_Msg_2"));
          console.log("else2 canMakePayments", error);
        }
      );
    } else {
      setAppleErrorMessage(t("Error_Msg_3"));
    }
  }, []);

  const validateTheSession = useCallback(
    async (validationUrl, completeValidationCallback) => {
      try {
        const params = { apple_url: validationUrl };
        const response = await validateURLSession(params);
        // console.log("JSON",JSON.parse(response?.data?.data));
        completeValidationCallback(response?.data?.data);
      } catch (err) {
        console.log("Validate Session Callback Error: ", err);
      }
    },
    [validateURLSession]
  );

  const handlePayment = useCallback(
    async (apple_token, completePaymentCallback) => {
      try {
        const params = {
          order_id: parseCookies()?.ORDER_ID,
          apple_pay_token: apple_token,
        };
        const response = await apple_pay(params);
        let succeed = response?.data?.payment_status;

        if (succeed == "SUCCESS") {
          completePaymentCallback(true);
          navigate(`/summary/${parseCookies()?.ORDER_ID}}/${lang}`);
          console.log("SUCCESSSSSSS");
        } else {
          completePaymentCallback(false);
          navigate(`/summary/${parseCookies()?.ORDER_ID}}/${lang}`);
          console.log("FAILYUUREEEEEEE");
        }
      } catch (err) {
        completePaymentCallback(false);
      }
    },
    [apple_pay]
  );

  const handleOnApplePayButtonClick = useCallback(() => {
    try {
      var request = {
        countryCode: "AE",
        currencyCode: "AED",
        supportedNetworks: ["visa", "masterCard", "amex", "discover"],
        merchantCapabilities: ["supports3DS"],
        total: {
          label: "IKEA UAE STORE",
          type: "final",
          amount: parseCookies()?.AMOUNT,
        },
      };

      var applePaySession = new ApplePaySession(6, request);

      applePaySession.begin();

      //Validate the Merchant and get Session Object to enable Touch ID or Face ID
      applePaySession.onvalidatemerchant = (event) => {
        const theValidationURL = event.validationURL;
        validateTheSession(theValidationURL, (merchantSession) => {
          applePaySession.completeMerchantValidation(merchantSession);
        });
      };

      // Triggered after the user confirms the transaction with Touch ID or Face ID
      applePaySession.onpaymentauthorized = (event) => {
        const paymentToken = event.payment.token;
        handlePayment(
          JSON.stringify(paymentToken.paymentData),
          (isPaymentDone) => {
            if (isPaymentDone) {
              applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS);
            } else {
              applePaySession.completePayment(ApplePaySession.STATUS_FAILURE);
            }
          }
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, [ApplePaySession, validateTheSession, handlePayment]);

  return {
    handleOnApplePayButtonClick,
    appleErrorMessage,
  };
};

export default useApplePay;
