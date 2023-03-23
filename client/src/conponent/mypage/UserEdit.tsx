import { useState } from "react";
import { useNavigate } from "react-router";
import { UserInfoItemTypes, userDelete, userEdit } from "../../util/MyApi";
import useInput from "../../util/MyInput";
import { validFn } from "../../function/validFn";
import styled from "styled-components";
import { media } from "../../style/Media";
import { PenIcon, CloseIcon } from "../../icons/MyIcon";
import logo from "../../icons/logo.svg";
import Loading from "../parts/Loading";
import UserModal from "./UserModal";
import Modal from "../Modal";

const MyInfo = styled.section`
  display: flex;
  margin-bottom: 4rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  ${media.mobile`
    flex-direction: column;
  `}
`;

const MyBox = styled.div`
  min-width: 16rem;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  ${media.mobile`
  align-items: center;
`}
`;

const MyProfile = styled.div`
  display: flex;
  width: 8rem;
  height: 8rem;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  background-color: #3c3c3c;
  .logo {
    width: 3rem;
    height: 3rem;
  }
`;

const MyTitleBg = styled.h4`
  font-size: 1.6rem;
  font-weight: 400;
`;

const MyTitleSm = styled.h5`
  font-size: 0.75rem;
  font-weight: 500;
  color: #3c3c3c;
`;

const MyEditItem = styled.div`
  display: flex;
  gap: 0.4rem;
  ${media.mobile`
    align-items:flex-start;
  `}
`;

const MyEdit = styled.div`
  position: relative;
  display: flex;
  gap: 0.33rem;
  align-items: center;
  ${media.mobile`
    flex-direction: column;
  `}
`;

const MyValidTxt = styled.div`
  position: absolute;
  bottom: -1rem;
  right: 0;
  font-size: 0.7rem;
  color: #fff;
  white-space: nowrap;
  ${media.mobile`
    position: static;
    bottom:auto;
    right:auto;
  `}
`;

const MyInput = styled.input`
  width: 12rem;
  padding: 0.33rem 0.5rem;
  background: #222;
  border: 1px solid #5a5959;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #3c3c3c;
  &::placeholder {
    color: #3c3c3c;
    font-weight: 500;
  }
  &:focus {
    border-color: #ff3366;
  }
`;

const MyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff3366;
  border-radius: 0.2rem;
  color: #fff;
  ${media.mobile`
    margin-top: 0.25rem;
  `}
  svg {
    margin: 0.16rem;
  }
`;

const MyBtnTxt = styled.span`
  display: block;
  margin: 0.33rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.025em;
`;

interface UserEditTypes {
  userInfo: UserInfoItemTypes;
  pending: boolean;
}

export default function UserEdit({ userInfo, pending }: UserEditTypes) {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [change, setChange] = useState(false);

  const [nickValue, nickBind, nickReset] = useInput(userInfo.nickName);
  const [user, setUser] = useState(userInfo.nickName);
  const [passValue, passBind, passReset] = useInput("");
  const [valid, setValid] = useState({ nickname: true, password: true });

  const handleEdit = () => {
    setEdit(!edit);
    nickReset(userInfo.nickName);
    passReset("");
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  const handleChange = () => {
    setChange(!change);
  };

  interface UserEdValidProps {
    word: string;
    label: string;
  }

  const handleValid = ({ word, label }: UserEdValidProps) => {
    const validCheck = ({ word, label }: UserEdValidProps) => {
      return validFn(label)(word);
    };
    const result = validCheck({ word, label });

    label === "password"
      ? (valid.password = result)
      : (valid.nickname = result);

    setValid(valid);
  };

  const editNickname = () => {
    userEdit("/members/edit/nickname", { nickName: nickValue });
    setUser(nickValue);
    setEdit(!edit);
  };

  const editPassword = () => {
    userEdit("/members/edit/password", { password: passValue });
    handleChange();
    passReset("");
  };

  const deleteAccount = () => {
    setAlert(!alert);

    userDelete("/members");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      {pending && <Loading />}

      {userInfo && (
        <MyInfo>
          <MyProfile>
            <img className="logo" src={logo} alt="logo" />
          </MyProfile>
          <MyBox>
            <MyEditItem>
              {edit ? (
                <MyEdit>
                  <MyInput
                    {...nickBind}
                    onFocus={() =>
                      handleValid({ word: nickValue, label: "nickname" })
                    }
                  />
                  {!valid.nickname && (
                    <MyValidTxt>닉네임을 확인해주세요!!</MyValidTxt>
                  )}
                </MyEdit>
              ) : (
                <MyTitleBg>{user || userInfo.nickName}</MyTitleBg>
              )}
              <MyBtn onClick={edit ? editNickname : handleEdit}>
                <PenIcon />
              </MyBtn>
              {edit && (
                <MyBtn onClick={handleEdit}>
                  <CloseIcon />
                </MyBtn>
              )}
            </MyEditItem>

            <MyTitleSm>비밀번호 변경</MyTitleSm>
            <MyEditItem>
              <MyEdit>
                <MyInput
                  type="password"
                  {...passBind}
                  onFocus={() =>
                    handleValid({ word: passValue, label: "password" })
                  }
                  placeholder="비밀번호를 수정하세요"
                />
                {!valid.password && (
                  <MyValidTxt>비밀번호를 확인해주세요!!</MyValidTxt>
                )}
              </MyEdit>
              <MyBtn
                onClick={
                  valid.password && passValue.length
                    ? editPassword
                    : handleConfirm
                }
              >
                <PenIcon />
              </MyBtn>
            </MyEditItem>
            <MyBtn onClick={handleModal}>
              <MyBtnTxt>회원 탈퇴</MyBtnTxt>
            </MyBtn>
          </MyBox>
        </MyInfo>
      )}

      {modal && (
        <UserModal
          alert={alert}
          handleModal={handleModal}
          deleteAccount={deleteAccount}
        />
      )}
      {confirm && (
        <Modal
          handleModal={handleConfirm}
          handleClick={handleConfirm}
          title={"비밀번호 확인"}
          text={"올바른 비밀번호가 아닙니다.\n다시 한 번 더 확인해주세요."}
        />
      )}
      {change && (
        <Modal
          handleModal={handleChange}
          handleClick={handleChange}
          title={"비밀번호 변경"}
          text={"입력된 비밀번호로\n변경되었습니다."}
          btnName={"확인"}
        />
      )}
    </>
  );
}
