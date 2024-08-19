import CreateFavoriteForm from "../../forms/CreateFavoriteForm";
import Modal from "../modal-templates/Modal";

const CreateFavoriteModal = () => {
  return (
    <Modal title="Add to Wishlist">
      <CreateFavoriteForm />
    </Modal>
  );
};

export default CreateFavoriteModal;
