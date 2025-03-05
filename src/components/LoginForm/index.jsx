import Style from "./LoginForm.module.scss";
import { Form } from "react-bootstrap";
import { Form as InformedForm, Input } from "informed";
import VerifyOTP from "../VerifyOTP";
import useLoginForm from "./useLoginForm";
import RegisterModal from "../RegisterModal";

const LoginForm = ({ getTextById }) => {
  const {
    rtl,
    iframeUrl,
    showModal,
    isTimerRunning,
    handleClose,
    setIsTimerRunning,
    handleShowRegister,
    handleFormSubmit,
    validateMobile,
    formApiRef,
  } = useLoginForm({ Style });

  return (
    <div className={`${Style.login} ${rtl}`}>
      <p>{getTextById(6)}</p>
      <InformedForm formApiRef={formApiRef} onSubmit={handleFormSubmit}>
        {({ formState }) => (
          <>
            <Form.Group className="form-group text-start">
              <Form.Label></Form.Label>
              <div className="relative">
                <input
                  readOnly
                  className={`${Style.static_input} ${rtl} form-control`}
                  value={"+974"}
                />
                <Input
                  type="text"
                  id="mobile"
                  maxLength={10}
                  className={`${Style.dynamic_input} ${rtl} form-control`}
                  placeholder="XXXXXXXX"
                  name="mobile"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  validate={validateMobile}
                />
              </div>
            </Form.Group>

            <button
              className={`custom_verify_btn ${
                formState?.submitting && "loading"
              }`}
              type="submit"
            >
              {getTextById(7)}
            </button>
          </>
        )}
      </InformedForm>

      <button className={Style.join} onClick={handleShowRegister}>
        {getTextById(20)}
      </button>

      <VerifyOTP
        shows={showModal?.isVerifyOtp}
        isTimerRunning={isTimerRunning}
        onHides={handleClose}
        setIsTimerRunning={setIsTimerRunning}
        getTextById={getTextById}
        rtl={rtl}
      />

      <RegisterModal
        show={showModal?.isRegister}
        handleClose={handleClose}
        iframeUrl={iframeUrl}
      />
    </div>
  );
};

export default LoginForm;
