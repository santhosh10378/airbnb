import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (modalName) => {
    setModal(modalName);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  const contextValue = {
    modal,
    openModal,
    closeModal,
    modalContent,
    setModalContent,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const { modal, openModal, closeModal, modalContent, setModalContent, t } =
    useContext(ModalContext);

  return { modal, openModal, closeModal, modalContent, setModalContent };
};
