/* eslint-disable react-hooks/exhaustive-deps */
import { ModalContext } from "./ModalContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type modal = {
  type:
    | ""
    | "가입실패"
    | "가입성공"
    | "로그인실패"
    | "submitFail"
    | "uploadImg"
    | "uploadImgFail"
    | "default";
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
      handleClick: () => modal?.setModal({ ...modal.modal, display: false }),
      handleModal: () => modal?.setModal({ ...modal.modal, display: false }),
    },
    가입성공: {
      display: true,
      title: "환영합니다.",
      text: "가입에 성공했습니다. 로그인해 주세요.",
      btnName: "로그인",
      handleClick: () => {
        modal?.setModal({ ...modal.modal, display: false });
        navigate("/login");
      },
      handleModal: () => {
        modal?.setModal({ ...modal.modal, display: false });
        navigate("/login");
      },
    },
    로그인실패: {
      display: true,
      title: "로그인 에러",
      text: "아이디와 비밀번호를 확인하세요.",
      btnName: "닫기",
      handleClick: () => modal?.setModal({ ...modal.modal, display: false }),
      handleModal: () => modal?.setModal({ ...modal.modal, display: false }),
    },
    submitFail: {
      display: true,
      title: "유효성 에러",
      text: "필수 입력칸을 모두 채워주세요.",
      btnName: "닫기",
      handleClick: () => modal?.setModal({ ...modal.modal, display: false }),
      handleModal: () => modal?.setModal({ ...modal.modal, display: false }),
    },
    uploadImg: {
      display: true,
      title: "이미지 업로드 중",
      text: "이미지를 업로드 중 입니다. 잠시만 기다려주세요.",
      btnName: "닫기",
      handleClick: () => {},
      handleModal: () => {},
    },
    uploadImgFail: {
      display: true,
      title: "이미지 업로드 실패",
      text: "이미지를 업로드 실패했습니다. 다시 시도해주세요.",
      btnName: "닫기",
      handleClick: () => modal?.setModal({ ...modal.modal, display: false }),
      handleModal: () => modal?.setModal({ ...modal.modal, display: false }),
    },
    default: {
      display: false,
      title: "",
      text: "",
      btnName: "",
      handleClick: () => modal?.setModal({ ...modal.modal, display: false }),
      handleModal: () => modal?.setModal({ ...modal.modal, display: false }),
    },
  };

  useEffect(() => {
    if (type.type !== "") {
      modal?.setModal(modalType[type.type]);
    }
  }, [type]);

  return [setType];
}
