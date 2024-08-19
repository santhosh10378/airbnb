import PropertyForm from "../../forms/PropertyForm";
import Modal from "../modal-templates/Modal";

const NewPropertyModal = () => {
  return (
    <Modal title="Airbnb your home">
      <PropertyForm />
    </Modal>
  );
};

export default NewPropertyModal;
