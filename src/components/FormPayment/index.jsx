import { Form, FloatingLabel } from "react-bootstrap";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";

import Style from "./FormPayment.module.scss";
import useFormPayment from "./useFormPayment";

const FormPayment = ({ userData, basicData }) => {
  const {
    handleOnCardTokenized,
    t,
    paymentOptionStatus,
    REACT_APP_CHECKOUT_PUBLIC_KEY,
    formik,
    rtl,
    lang,
  } = useFormPayment({
    userData,
    Frames,
  });

  return (
    <div
      className={`${Style.payment} ${rtl}`}
      style={{
        display:
          paymentOptionStatus == "1" || paymentOptionStatus == "2"
            ? ""
            : "none",
      }}
    >
      {basicData?.data?.card_payment === "1" && (
        <div className={Style.checkbox}>
          <Form.Check
            type="radio"
            name="type"
            id="card"
            defaultChecked
            label={""}
          />
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
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          },
          cardholder: {
            name: formik.values.cardholderName,
          },
        }}
        cardTokenized={handleOnCardTokenized}
      >
        <Form onSubmit={formik.handleSubmit}>
          <div className={Style.payment_input}>
            <div className={Style.input_wrap}>
              <FloatingLabel
                controlId="cardNumber"
                className={Style.form_group}
              >
                <CardNumber
                  className={`${Style.form_control} form-control`}
                  onChange={formik.handleChange}
                  value={formik.values.cardNumber}
                />
              </FloatingLabel>
              <div className={Style.dropdown_wrap}>
                <FloatingLabel
                  className={`${Style.form_group} ${Style.dropdown}`}
                >
                  <ExpiryDate
                    className={`${Style.form_control} form-control`}
                    onChange={formik.handleChange}
                    value={formik.values.expiryDate}
                  />
                </FloatingLabel>
              </div>
            </div>
            <div className={Style.input_wrap}>
              <FloatingLabel
                controlId="cardHolder"
                className={Style.form_group}
              >
                <Form.Control
                  type="text"
                  placeholder={t("Card_Holder_Name")}
                  className={Style.form_control}
                  onChange={formik.handleChange}
                  value={formik.values.cardholderName}
                  required
                />
              </FloatingLabel>
              <div className={Style.dropdown_wrap}>
                <FloatingLabel
                  controlId="Security"
                  className={`${Style.form_group} ${Style.dropdown}`}
                >
                  <Cvv
                    className={`${Style.form_control} form-control`}
                    onChange={formik.handleChange}
                    value={formik.values.cvv}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
          <div className={Style.btn_wrap}>
            <button
              type="submit"
              className={`${
                formik.isSubmitting
                  ? "loading custom_btn custom_btn-primary"
                  : "custom_btn custom_btn-primary"
              }`}
              id="payButton"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {t("PAY")}
            </button>
          </div>
        </Form>
      </Frames>
      <small className="error">
        {formik.errors.cardholderName && (
          <span>{formik.errors.cardholderName}</span>
        )}
      </small>
    </div>
  );
};

export default FormPayment;
