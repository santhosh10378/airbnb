import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { CloseIcon } from "../../../assets";
import { useModal } from "../../../context/ModalContext";
import Button from "../../elements/Button";

const Modal = ({ title, children }) => {
  const { closeModal, modal } = useModal();
  const isAuthModal = modal === "LoginModal" || modal === "RegisterModal";
  const isSearchModal = modal === "SearchModal";
  const isCreateWishListModal = modal === "CreateWishListModal";
  const isCreateFavoriteModal = modal === "CreateFavoriteModal";
  const splModal =
    isAuthModal ||
    isSearchModal ||
    isCreateWishListModal ||
    isCreateFavoriteModal;

  return (
    <dialog className="bg-black/70 fixed inset-0 w-screen h-screen flex items-center justify-center z-50">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: modal === null ? 100 : 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
        }}
        className={twMerge(
          "bg-white  overflow-y-hidden md:rounded-xl relative",
          splModal
            ? "w-full md:w-[400px] lg:w-[500px] md:max-w-[780px] h-[98vh] md:h-auto"
            : "w-full md:w-[688px] lg:w-[780px] md:max-w-[780px] h-[98vh] md:h-[90vh]"
        )}
      >
        {title && (
          <div className="p-4 flex items-center justify-center text-secondary-800 font-semibold">
            {title}
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Button
            onClick={closeModal}
            variant="primary-ghost"
            className="p-1 hover:bg-black/10"
          >
            <CloseIcon className="size-4" />
          </Button>
        </div>
        <div className="h-full">{children}</div>
      </motion.div>
    </dialog>
  );
};

export default Modal;
