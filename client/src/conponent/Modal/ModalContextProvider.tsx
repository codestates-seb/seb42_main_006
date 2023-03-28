import React, { createContext, SetStateAction, useMemo, useState } from "react";
import { ModalProps } from "./Modal";
import Modal from "./Modal";

interface IModalState extends ModalProps {
  display: boolean;
}

export const ModalContext = createContext<{
  modal: IModalState;
  setModal: React.Dispatch<SetStateAction<IModalState>>;
} | null>(null);

interface IModalProp {
  children: React.ReactNode;
}

export default function ModalContextProvider({ children }: IModalProp) {
  const [modal, setModal] = useState<IModalState>({
    display: false,
    title: "",
    text: "",
    handleClick: () => {
      setModal({ ...modal, display: false });
    },
    handleModal: () => {
      setModal({ ...modal, display: false });
    },
    btnName: "",
  });

  const value = useMemo(() => ({ modal, setModal }), [modal, setModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal.display && (
        <Modal
          title={modal.title}
          btnName={modal.btnName}
          text={modal.text}
          handleClick={modal.handleClick}
          handleModal={modal.handleModal}
        />
      )}
    </ModalContext.Provider>
  );
}
