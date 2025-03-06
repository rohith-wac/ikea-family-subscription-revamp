import { Form, FloatingLabel } from "react-bootstrap";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";
import Style from "./FormPayment.module.scss";
import useFormPayment from "./useFormPayment";
import { Form as InformedForm, Input } from "informed";
import { DIRECTION } from "../../constants";

const FormPayment = ({ basicData }) => {
  const {
    handleOnCardTokenized,
    t,
    REACT_APP_CHECKOUT_PUBLIC_KEY,
    rtl,
    lang,
    handleSubmit,
    showCardType,
    formApiRef,
  } = useFormPayment({
    Frames,
    Style,
    basicData,
  });
  return (
    <div className={`${Style.payment} ${rtl}`}>
      {showCardType && (
        <div className={Style.checkbox}>
          <Form.Check type="radio" name="type" id="card" defaultChecked />
          <div className={Style.check_label}>
            <div>
              <p>{t("cardType")}</p>
              <span>{t("cardPay")}</span>
            </div>
          </div>
        </div>
      )}
      <Frames
        config={{
          debug: false,
          publicKey: REACT_APP_CHECKOUT_PUBLIC_KEY,
          localization: lang === "ar" ? "AR" : "EN-GB",
          style: {
            base: {
              direction: DIRECTION?.[lang] ?? "en",
            },
          },
          cardholder: {
            name: "cardholderName",
          },
        }}
        cardTokenized={handleOnCardTokenized}
      >
        <InformedForm onSubmit={handleSubmit} formApiRef={formApiRef}>
          {({ formState }) => (
            <>
              <div className={Style.payment_input}>
                <div className={Style.input_wrap}>
                  <FloatingLabel
                    controlId="cardNumber"
                    className={Style.form_group}
                    label="Card Number"
                  >
                    <CardNumber
                      className={`${Style.form_control} form-control`}
                    />
                  </FloatingLabel>
                  <div className={Style.dropdown_wrap}>
                    <FloatingLabel
                      className={`${Style.form_group} ${Style.dropdown}`}
                    >
                      <ExpiryDate
                        className={`${Style.form_control} form-control`}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className={Style.input_wrap}>
                  <FloatingLabel
                    controlId="cardHolder"
                    className={Style.form_group}
                  >
                    <Input
                      type="text"
                      placeholder={t("Card_Holder_Name")}
                      className={`${Style.form_control} form-control`}
                      name="cardholderName"
                    />
                  </FloatingLabel>
                  <div className={Style.dropdown_wrap}>
                    <FloatingLabel
                      controlId="Security"
                      className={`${Style.form_group} ${Style.dropdown}`}
                    >
                      <Cvv className={`${Style.form_control} form-control`} />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
              <div className={Style.btn_wrap}>
                <button
                  type="submit"
                  className={`${
                    formState.submitting
                      ? "loading custom_btn custom_btn-primary"
                      : "custom_btn custom_btn-primary"
                  }`}
                  id="payButton"
                  disabled={formState.submitting || !formState.valid}
                >
                  {t("PAY")}
                </button>
              </div>
            </>
          )}
        </InformedForm>
      </Frames>
      {/* <small className="error">
        {formState.errors?.cardholderName && (
          <span>{formState.errors.cardholderName}</span>
        )}
      </small> */}
    </div>
  );
};

export default FormPayment;
