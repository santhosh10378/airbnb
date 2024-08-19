import { useModal } from "../../../context/ModalContext";
import AmenitiesModal from "../modal-objects/AmenitiesModal";
import CreateFavoriteModal from "../modal-objects/CreateFavoriteModal";
import CreateWishListModal from "../modal-objects/CreateWishListModal";
import DescriptionModal from "../modal-objects/DescriptionModal";
import FiltersModal from "../modal-objects/FiltersModal";
import LoginModal from "../modal-objects/LoginModal";
import NewPropertyModal from "../modal-objects/NewPropertyModal";
import RegisterModal from "../modal-objects/RegisterModal";
import ReservationModal from "../modal-objects/ReservationModal";
import MobileSearchModal from "../modal-objects/MobileSearchModal";

const modalLookUp = {
  SearchModal: MobileSearchModal,
  NewPropertyModal: NewPropertyModal,
  FiltersModal: FiltersModal,
  RegisterModal: RegisterModal,
  LoginModal: LoginModal,
  AmenitiesModal: AmenitiesModal,
  DescriptionModal: DescriptionModal,
  ReservationModal: ReservationModal,
  CreateWishListModal: CreateWishListModal,
  CreateFavoriteModal: CreateFavoriteModal,
};

const ModalManager = () => {
  const { modal } = useModal();

  if (!modal) return null;

  const Modal = modalLookUp[modal];

  return <Modal />;
};

export default ModalManager;
