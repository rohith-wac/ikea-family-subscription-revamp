import { parseCookies, setCookie } from "nookies";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { resendOTP, verifyOTP } from "./api";
import { getFromLocalStorage } from "../../helpers/functions";

const useVerifyOTP = ({ onHides, setIsTimerRunning }) => {
  const [timer, setTimer] = useState(59);
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const user_id = parseCookies()?.userID;
  const lang = getFromLocalStorage("language_type");
  const formApiRef = useRef();

  const resetTimer = () => {
    setTimer(59);
    setIsTimerRunning(true);
  };

  const validateOtp = (value) => {
    if (!value) {
      return t("OTP_required");
    }
    if (!/^\d+$/.test(value)) {
      return t("Invalid_otp");
    }
    if (value.length !== 6) {
      return t("OTP_required");
    }
    return null; // return null if validation passes
  };

  // Form submission handler
  const handleSubmit = async (formState) => {
    try {
      // Validate OTP
      const otpError = validateOtp(formState?.values?.otp);
      if (otpError) return formApiRef?.current?.setError("otp", otpError);
      const response = await verifyOTP(formState?.values);
      if (response?.data?.code === 200) {
        setCookie(
          null,
          "USER_ACCESS_TOKEN",
          response?.data?.data?.access_token,
          { maxAge: 86400, path: "/" }
        );
        resetFormAndClose();
        navigate(`/subscription/${lang}`);
        onHides();
        formApiRef?.current?.reset();
      } else {
        formApiRef?.current?.setError("otp", response?.message);
      }
    } catch (error) {
      formApiRef?.current?.setError(
        "otp",
        error?.response?.data?.errors?.otp || error?.response?.data?.message
      );
    }
  };

  useEffect(() => {
    if (!timer) setIsTimerRunning(false);
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    resetTimer();
    formApiRef?.current?.reset();
    try {
      const response = await resendOTP({ user_code: user_id });
      if (response?.data?.status_code !== 200) {
        formApiRef?.current?.setFieldError("otp", response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetFormAndClose = () => {
    formApiRef?.current?.reset();
    setIsTimerRunning(false);
    setTimer(59);
    onHides();
  };

  return {
    t,
    timer,
    isTimerRunning: timer > 0,
    resetFormAndClose,
    handleResend,
    handleSubmit,
    validateOtp,
    formApiRef,
  };
};

export default useVerifyOTP;
