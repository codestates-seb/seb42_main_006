import { ModalContext } from "./ModalContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type modal = {
  type: "" | "가입실패" | "가입성공" | "로그인실패";
};

export default function useModal() {
  const [type, setType] = useState<modal>({ type: "" });
  const modal = useContext(ModalContext);
  const navigate = useNavigate();

  const modalType: { [key: string]: any } = {
    가입실패: {
      display: true,
      title: "가입 실패",
      text: "가입에 실패했습니다. 다시 시도해 주세요.",
      btnName: "닫기",
      handleClick: () =>
        modal?.setIsModal({ ...modal.isModal, display: false }),
      handleModal: () =>
        modal?.setIsModal({ ...modal.isModal, display: false }),
    },
    가입성공: {
      display: true,
      title: "환영합니다.",
      text: "가입에 성공했습니다. 로그인해 주세요.",
      btnName: "로그인",
      handleClick: () => {
        modal?.setIsModal({ ...modal.isModal, display: false });
        navigate("/login");
      },
      handleModal: () => {
        modal?.setIsModal({ ...modal.isModal, display: false });
        navigate("/login");
      },
    },
    로그인실패: {
      display: true,
      title: "로그인 에러",
      text: "아이디와 비밀번호를 확인하세요.",
      btnName: "닫기",
      handleClick: () =>
        modal?.setIsModal({ ...modal.isModal, display: false }),
      handleModal: () =>
        modal?.setIsModal({ ...modal.isModal, display: false }),
    },
  };

  useEffect(() => {
    if (type.type !== "") {
      modal?.setIsModal(modalType[type.type]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return [setType];
}
