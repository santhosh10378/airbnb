import AuthForm from "../../forms/AuthForm";
import Modal from "../modal-templates/Modal";

const RegisterModal = () => {
  return (
    <Modal title="Register">
      <AuthForm />
    </Modal>
  );
};

export default RegisterModal;
