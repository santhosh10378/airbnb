import { useModal } from "../../../context/ModalContext";
import Modal from "../modal-templates/Modal";

const DescriptionModal = () => {
  const { modalContent } = useModal();

  return <Modal>{modalContent}</Modal>;
};

export default DescriptionModal;
