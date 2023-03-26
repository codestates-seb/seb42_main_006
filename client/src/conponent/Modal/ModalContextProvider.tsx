import React, { createContext, SetStateAction, useState } from "react";
import { ModalProps } from "./Modal";

interface IModalState extends ModalProps {
  display: boolean;
}

export const ModalContext = createContext<{
  isModal: IModalState;
  setIsModal: React.Dispatch<SetStateAction<IModalState>>;
} | null>(null);

interface IModalProp {
  children: React.ReactNode;
}

export default function ModalContextProvider({ children }: IModalProp) {
  const [isModal, setIsModal] = useState<IModalState>({
    display: false,
    title: "",
    text: "",
    handleClick: () => {
      setIsModal({ ...isModal, display: false });
    },
    handleModal: () => {
      setIsModal({ ...isModal, display: false });
    },
    btnName: "",
  });

  return (
    <ModalContext.Provider value={{ isModal, setIsModal }}>
      {children}
    </ModalContext.Provider>
  );
}
