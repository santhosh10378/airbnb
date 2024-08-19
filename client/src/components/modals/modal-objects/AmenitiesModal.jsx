import { useModal } from "../../../context/ModalContext";
import Modal from "../modal-templates/Modal";

const AmenitiesModal = () => {
  const { modalContent } = useModal();

  return <Modal>{modalContent}</Modal>;
};

export default AmenitiesModal;
