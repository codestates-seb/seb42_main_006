import styled from "styled-components";
import { CloseIcon } from "../../icons/MyIcon";
import { ModalWrap, ModalBox, ModalTitle } from "../Modal/Modal";
import { ModalTxt, ModalBtnBox, CloseBtn, ModalBtn } from "../Modal/Modal";

interface UserModalProps {
  alert: boolean;
  handleModal: () => void;
  deleteAccount: () => void;
}

const PointModalTxt = styled(ModalTxt)`
  .siteName {
    font-weight: 400;
    color: #ff3366;
  }
`;

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
          <PointModalTxt>
            회원탈퇴가 완료되었습니다!
            <br /> 지금까지 <strong className="siteName">MOHAE</strong>를 <br />
            이용해주셔서 감사합니다.
          </PointModalTxt>
        ) : (
          <>
            <ModalTitle>회원 탈퇴</ModalTitle>
            <ModalTxt>
              회원 탈퇴시 <br />
              사이트 내 모든 개인 정보가 삭제됩니다.
              <br />
              계속 진행하시겠습니까?
            </ModalTxt>
            <ModalBtnBox>
              <ModalBtn onClick={deleteAccount}>탈퇴</ModalBtn>
            </ModalBtnBox>
          </>
        )}
      </ModalBox>
    </ModalWrap>
  );
}
