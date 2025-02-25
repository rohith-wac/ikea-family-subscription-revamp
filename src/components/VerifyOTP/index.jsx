import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Style from "./VerifyOTP.module.scss";
import useVerifyOTP from "./useVerifyOTP";
import OTPInput from "react-otp-input";

const VerifyOTP = ({ rtl, shows, setIsTimerRunning, onHides, getTextById }) => {
  const { t, timer, formik, isTimerRunning, resetFormAndClose, handleResend } =
    useVerifyOTP({ onHides, setIsTimerRunning });

  return (
    <Modal
      show={shows}
      onHide={resetFormAndClose}
      centered
      className={`${Style.modal} ${rtl}`}
    >
      <button onClick={resetFormAndClose} className={Style.close}></button>

      <Modal.Body>
        <h2 className={Style.title}>{getTextById(8)}</h2>
        <p className={Style.head_text}>{getTextById(9)}</p>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group className={`form-group text-start ${Style.otpform}`}>
            <OTPInput
              value={formik.values.otp}
              onChange={(value) => {
                formik.setFieldValue("otp", parseInt(value));
                if (value?.length === 6) formik.handleSubmit();
              }}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              name="otp"
              containerStyle={Style.otpInputWrp}
              inputStyle={`flex-fill ${Style.otpInput}`}
              renderInput={(props) => <Form.Control {...props} />}
            />
          </Form.Group>

          {formik.touched.otp && formik.errors.otp && (
            <div className="formikError">{formik.errors.otp}</div>
          )}

          <button
            className={`custom_verify_btn ${formik.isSubmitting && "loading"}`}
            type="submit"
          >
            {getTextById(8)}
          </button>
        </form>

        {!isTimerRunning ? (
          <button className={Style.resend_btn} onClick={handleResend}>
            {getTextById(10)}
          </button>
        ) : (
          <p className="resend">
            {getTextById(10)} ({t("IN")} <span>{timer}</span> {t("SECONDS")})
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default VerifyOTP;
