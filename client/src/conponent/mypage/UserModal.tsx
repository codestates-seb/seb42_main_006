import styled from "styled-components";
import { CloseIcon } from "../../icons/MyIcon";

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalBox = styled.div`
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
  .modalTxt {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.3;
    .siteName {
      font-weight: 400;
      color: #ff3366;
    }
  }
  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
`;

const ModalTitle = styled.h3`
  padding-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-align: center;
  color: #ff3366;
  border-bottom: 1px solid #5a5959;
`;

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

const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  color: #5a5959;
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
