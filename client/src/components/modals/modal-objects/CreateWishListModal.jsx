import CreateWishListForm from "../../forms/CreateWishListForm";
import Modal from "../modal-templates/Modal";

const CreateWishListModal = () => {
  return (
    <Modal title="New Wishlist">
      <CreateWishListForm />
    </Modal>
  );
};

export default CreateWishListModal;
