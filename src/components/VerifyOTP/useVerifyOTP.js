import { useFormik } from "formik";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { resendOTP, verifyOTP } from "./api";

const useVerifyOTP = ({ onHides, setIsTimerRunning }) => {
  const [timer, setTimer] = useState(59);
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const user_id = parseCookies()?.userID;
  const lang = localStorage.getItem("language_type");

  const resetTimer = () => {
    setTimer(59);
    setIsTimerRunning(true);
  };

  const formik = useFormik({
    initialValues: { otp: "", user_code: user_id },
    validationSchema: Yup.object({
      otp: Yup.number().min(6).max(6).required(t("OTP_required")),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await verifyOTP(values);
        if (response?.data?.code === 200) {
          setCookie(
            null,
            "USER_ACCESS_TOKEN",
            response?.data?.data?.access_token,
            { maxAge: 86400, path: "/" }
          );
          resetForm();
          navigate(`/subscription/${lang}`);
          onHides();
        } else {
          formik.setFieldError("otp", response?.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (!timer) setIsTimerRunning(false);
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    resetTimer();
    formik.resetForm();
    try {
      const response = await resendOTP({ user_code: user_id });
      if (response?.data?.status_code !== 200) {
        formik.setFieldError("otp", response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetFormAndClose = () => {
    formik.resetForm();
    setIsTimerRunning(false);
    setTimer(59);
    onHides();
  };

  return {
    t,
    timer,
    formik,
    isTimerRunning: timer > 0,
    resetFormAndClose,
    handleResend,
  };
};

export default useVerifyOTP;
