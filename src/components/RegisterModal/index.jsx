import { Modal } from "react-bootstrap";

const RegisterModal = ({ show, handleClose, iframeUrl }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter align-items-end"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <iframe
          src={iframeUrl}
          title="IKEA Family Member Page"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "1550px",
            border: "none",
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
