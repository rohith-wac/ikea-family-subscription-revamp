// import Style from "./LoginForm.module.scss";
// import { Form } from "react-bootstrap";
// import VerifyOTP from "../VerifyOTP";
// import useLoginForm from "./useLoginForm";
// import RegisterModal from "../RegisterModal";

// const LoginForm = ({ getTextById }) => {
//   const {
//     rtl,
//     formik,
//     iframeUrl,
//     showModal,
//     isTimerRunning,
//     handleClose,
//     setIsTimerRunning,
//     handleShowRegister,
//   } = useLoginForm({ Style });

//   return (
//     <div className={`${Style.login} ${rtl}`}>
//       <p>{getTextById(6)}</p>
//       <form onSubmit={formik.handleSubmit}>
//         <Form.Group className="form-group text-start">
//           <Form.Label></Form.Label>
//           <div className="relative">
//             <input
//               readOnly
//               className={`${Style.static_input} ${rtl} form-control`}
//               value={"+974"}
//             />
//             <Form.Control
//               type="text"
//               id="mobile"
//               onChange={formik.handleChange}
//               maxLength={10}
//               value={formik.values.mobile}
//               className={`${Style.dynamic_input} ${rtl}`}
//               placeholder="XXXXXXXX"
//               name="mobile"
//               onKeyPress={(event) => {
//                 if (!/[0-9]/.test(event.key)) {
//                   event.preventDefault();
//                 }
//               }}
//             />
//           </div>
//           {formik.touched.mobile && formik.errors.mobile && (
//             <div className="formikError">{formik.errors.mobile}</div>
//           )}
//         </Form.Group>

//         <button
//           className={`${
//             formik?.isSubmitting
//               ? "loading custom_verify_btn"
//               : " custom_verify_btn"
//           }`}
//           type="sumbit"
//         >
//           {getTextById(7)}
//         </button>
//       </form>

//       <button className={Style.join} onClick={handleShowRegister}>
//         {getTextById(20)}
//       </button>

//       <VerifyOTP
//         shows={showModal?.isVerifyOtp}
//         isTimerRunning={isTimerRunning}
//         onHides={handleClose}
//         setIsTimerRunning={setIsTimerRunning}
//         getTextById={getTextById}
//         rtl={rtl}
//       />

//       <RegisterModal
//         show={showModal?.isRegister}
//         handleClose={handleClose}
//         iframeUrl={iframeUrl}
//       />
//     </div>
//   );
// };

// export default LoginForm;
import Style from "./LoginForm.module.scss";
import { Form } from "react-bootstrap";
import { Form as InformedForm, Input, Debug } from "informed";
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
  } = useLoginForm({ Style });

  return (
    <div className={`${Style.login} ${rtl}`}>
      <p>{getTextById(6)}</p>
      <InformedForm onSubmit={handleFormSubmit}>
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

            />
          </div>
          {/* {formik.touched.mobile && formik.errors.mobile && (
            <div className="formikError">{formik.errors.mobile}</div>
          )} */}
        </Form.Group>

        <button
          // className={`${
          //   formik?.isSubmitting
          //     ? "loading custom_verify_btn"
          //     : " custom_verify_btn"
          // }`}
          type="sumbit"
        >
          {getTextById(7)}
        </button>
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
