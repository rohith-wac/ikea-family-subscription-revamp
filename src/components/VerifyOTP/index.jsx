import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { Form as InformedForm } from "informed";
import Style from "./VerifyOTP.module.scss";
import useVerifyOTP from "./useVerifyOTP";
import OTPInput from "react-otp-input";

const VerifyOTP = ({ rtl, shows, setIsTimerRunning, onHides, getTextById }) => {
  const {
    t,
    timer,
    isTimerRunning,
    resetFormAndClose,
    handleResend,
    handleSubmit,
    formApiRef,
  } = useVerifyOTP({ onHides, setIsTimerRunning });
  return (
    <Modal
      show={shows}
      onHide={resetFormAndClose}
      centered
      className={`${Style.modal} ${rtl}`}
    >
      <button onClick={resetFormAndClose} className={Style.close} />

      <Modal.Body>
        <h2 className={Style.title}>{getTextById(8)}</h2>
        <p className={Style.head_text}>{getTextById(9)}</p>
        <InformedForm onSubmit={handleSubmit} formApiRef={formApiRef}>
          {({ formState }) => (
            <>
              <Form.Group className={`form-group text-start ${Style.otpform}`}>
                <OTPInput
                  value={formState.values?.otp || ""}
                  onChange={(otpValue) => {
                    formApiRef?.current?.setValue("otp", otpValue);
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

              {formState.errors.otp && (
                <div className="formikError">{formState.errors.otp}</div>
              )}
              <button
                className={`custom_verify_btn ${
                  formState.submitting && "loading"
                }`}
                type="submit"
              >
                {getTextById(8)}
              </button>
            </>
          )}
        </InformedForm>

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
