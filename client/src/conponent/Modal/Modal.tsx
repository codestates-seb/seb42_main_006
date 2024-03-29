import styled from "styled-components";
import { CloseIcon } from "../../icons/MyIcon";

export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
`;

export const ModalBox = styled.div`
  position: absolute;
  width: 20rem;
  padding: 1.3rem 1.6rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: #222;
  border: 1px solid #5a5959;
  border-radius: 0.63rem;
`;

export const ModalTxt = styled.p`
  padding: 1rem;
  font-size: 0.85rem;
  line-height: 1.3;
  white-space: pre-line;
  color: #fff;
`;

export const ModalTitle = styled.h3`
  padding-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-align: center;
  color: #ff3366;
  border-bottom: 1px solid #5a5959;
`;

export const ModalBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  color: #5a5959;
`;

export const ModalBtn = styled.button`
  display: flex;
  min-width: 4.5rem;
  padding: 0.36rem 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.045em;
  background: #ff3366;
  border-radius: 0.2rem;
  color: #fff;
`;

export interface ModalProps {
  title: string;
  text: string;
  btnName?: string;
  handleModal: () => void;
  handleClick: () => void;
}

export default function Modal({
  title,
  text,
  btnName,
  handleModal,
  handleClick,
}: ModalProps) {
  return (
    <ModalWrap>
      <ModalBox>
        <CloseBtn onClick={handleModal}>
          <CloseIcon />
        </CloseBtn>
        <ModalTitle>{title}</ModalTitle>
        <ModalTxt>{text}</ModalTxt>
        {btnName && (
          <ModalBtnBox>
            <ModalBtn onClick={handleClick}>{btnName}</ModalBtn>
          </ModalBtnBox>
        )}
      </ModalBox>
    </ModalWrap>
  );
}
