import AuthForm from "../../forms/AuthForm";
import Modal from "../modal-templates/Modal";

const LoginModal = () => {
  return (
    <Modal title="Login">
      <AuthForm isLogin={true} />
    </Modal>
  );
};

export default LoginModal;
