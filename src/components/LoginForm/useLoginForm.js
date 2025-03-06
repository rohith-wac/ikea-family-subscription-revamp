import { useRef, useState } from "react";
import { setCookie } from "nookies";
import { useRtl } from "../../hooks/useRtl";
import {
  getFromLocalStorage,
  pushToAdobeDataLayer,
} from "../../helpers/functions";
import { useTranslation } from "react-i18next";
import { useSwrMutate } from "../../helpers/swr";

const useLoginForm = ({ Style }) => {
  const { t } = useTranslation(["common"]);
  const { rtl } = useRtl({ Style });
  const { trigger: profileLogin, isError } = useSwrMutate("/login");
  const formApiRef = useRef();

  const [showModal, setShowModal] = useState({
    isVerifyOtp: false,
    isRegister: false,
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const lang = getFromLocalStorage("language_type");

  // validation for mobile input field
  const validateMobile = (value) => {
    if (!value) {
      return t("Mobile_required");
    }
    if (!/^\d+$/.test(value)) {
      return t("Invalid_mobile");
    }
    if (value.length < 8) {
      return t("min");
    }
    if (value.length > 9) {
      return t("max");
    }
  };

  const handleFormSubmit = async (formState) => {
    try {
      const obj = {
        ...formState?.values,
        language: lang,
      };
      const response = await profileLogin(obj);

      if (response?.data?.code === 200) {
        setCookie(null, "userID", response?.data?.data?.user_code);
        pushToAdobeDataLayer(obj);
        handleShow();
      } else {
        formApiRef?.current?.setError(
          "mobile",
          response?.errors?.mobile || response?.message
        );
      }
    } catch (error) {
      formApiRef?.current?.setError(
        "mobile",
        error?.response?.data?.errors?.mobile || error?.response?.data?.message
      );
    }
  };
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
    lang === "en"
      ? import.meta.env.VITE_REACT_APP_REGISTER_IFRAME_EN
      : import.meta.env.VITE_REACT_APP_REGISTER_IFRAME_AR;

  return {
    rtl,
    showModal,
    isTimerRunning,
    handleClose,
    setIsTimerRunning,
    handleShowRegister,
    iframeUrl,
    handleFormSubmit,
    validateMobile,
    formApiRef,
  };
};

export default useLoginForm;
