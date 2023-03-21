import styled from "styled-components";
import { CloseIcon } from "../../icons/MyIcon";
import { ModalWrap, ModalBox, ModalTitle, CloseBtn } from "../Modal";

const ModalBtn = styled.button`
  display: flex;
  width: 4.5rem;
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

interface UserModalProps {
  deleteAccount: () => void;
  handleModal: () => void;
  alert: boolean;
}

export default function UserModal({
  alert,
  handleModal,
  deleteAccount,
}: UserModalProps) {
  return (
    <ModalWrap>
      <ModalBox>
        <CloseBtn onClick={handleModal}>
          <CloseIcon />
        </CloseBtn>
        {alert ? (
          <p className="modalTxt">
            회원탈퇴가 완료되었습니다!
            <br /> 지금까지 <strong className="siteName">MOHAE</strong>를 <br />
            이용해주셔서 감사합니다.
          </p>
        ) : (
          <>
            <ModalTitle>회원 탈퇴</ModalTitle>
            <p className="modalTxt">
              회원 탈퇴시 <br />
              사이트 내 모든 개인 정보가 삭제됩니다.
              <br />
              계속 진행하시겠습니까?
            </p>
            <div className="buttonBox">
              <ModalBtn onClick={deleteAccount}>탈퇴</ModalBtn>
            </div>
          </>
        )}
      </ModalBox>
    </ModalWrap>
  );
}
