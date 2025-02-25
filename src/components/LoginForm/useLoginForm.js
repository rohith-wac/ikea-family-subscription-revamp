import { useFormik } from "formik";
import { setCookie } from "nookies";
import { useState } from "react";
import * as Yup from "yup";
import { profileLogin } from "./api";
import { useRtl } from "../../hooks/useRtl";
import { pushToAdobeDataLayer } from "../../helpers/functions";
import { useTranslation } from "react-i18next";

const useLoginForm = ({ Style }) => {
  const { t } = useTranslation(["common"]);
  const { rtl } = useRtl({ Style });
  const [showModal, setShowModal] = useState({
    isVerifyOtp: false,
    isRegister: false,
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const lang = localStorage.getItem("language_type")

  const formik = useFormik({
    initialValues: {
      mobile: "",
      language: lang,
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .matches(/^\d+\.?\d*$/, t("Invalid_mobile"))
        .required(t("Mobile_required"))
        .min(8, t("min"))
        .max(9, t("max")),
    }),
    onSubmit: async (values) => {
      try {
        const response = await profileLogin(values);
        if (response?.data?.code == 200) {
          setCookie(null, "userID", response?.data?.data?.user_code);
          pushToAdobeDataLayer(values);
          handleShow();
        } else {
          formik.setFieldError(
            "mobile",
            response?.errors?.mobile || response?.message
          );
        }
      } catch (error) {
        console.log(error);
        formik.setFieldError(
          "mobile",
          error ?? "unable to verify at the moment"
        );
      }
    },
  });

  const handleClose = () => {
    setShowModal({
      isVerifyOtp: false,
      isRegister: false,
    });
    document.documentElement.classList.remove("no-scroll");
  };

  const handleShowRegister = () => {
    setShowModal((prev) => ({ ...prev, isRegister: true }));
    document.documentElement.classList.add("no-scroll");
  };

  const handleShow = () => {
    setShowModal((prev) => ({ ...prev, isVerifyOtp: true }));
    setIsTimerRunning(true);
  };

  const iframeUrl =
  lang == "en"
    ? import.meta.env.VITE_REACT_APP_REGISTER_IFRAME_EN
    : import.meta.env.VITE_REACT_APP_REGISTER_IFRAME_AR;

  return {
    rtl,
    formik,
    showModal,
    isTimerRunning,
    handleClose,
    setIsTimerRunning,
    handleShowRegister,
    iframeUrl
  };
};

export default useLoginForm;
