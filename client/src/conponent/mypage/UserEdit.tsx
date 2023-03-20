import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserInfo, userDelete, userEdit } from "../../util/MyApi";
import useInput from "../../util/MyInput";
import { validFn } from "../../function/validFn";
import styled from "styled-components";
import { media } from "../../style/Media";
import { PenIcon, CloseIcon } from "../../icons/MyIcon";
import logo from "../../img/logo.svg";
import UserModal from "./UserModal";

const MyInfo = styled.section`
  display: flex;
  margin-bottom: 4rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  ${media.mobile`
    flex-direction: column;
  `}
  .myBox {
    min-width: 16rem;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    ${media.mobile`
      align-items: center;
    `}
  }
  .editItem {
    display: flex;
    gap: 0.4rem;
  }
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

const MyEdit = styled.div`
  position: relative;
  display: flex;
  gap: 0.33rem;
  align-items: center;
  .validTxt {
    position: absolute;
    bottom: -1rem;
    right: 0;
    font-size: 0.7rem;
    color: #fff;
    white-space: nowrap;
  }
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
  svg {
    margin: 0.16rem;
  }
  .btnText {
    display: block;
    margin: 0.33rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.025em;
  }
`;

export default function UserEdit() {
  const navigate = useNavigate();

  const [info] = useUserInfo(`/members/mypage`);

  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);

  let userInfo: any = {};
  userInfo = info;

  const [nickValue, nickBind, nickReset] = useInput(userInfo.nickName);
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

    setTimeout(() => {
      window.location.reload();
    }, 50);

    setTimeout(() => {
      setEdit(!edit);
    }, 100);
  };

  const editPassword = () => {
    userEdit("/members/edit/password", { password: passValue });
    passReset("");
  };

  const deleteAccount = () => {
    setAlert(!alert);

    userDelete("/members");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("user");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <MyInfo>
        <MyProfile>
          <img className="logo" src={logo} alt="logo" />
        </MyProfile>
        <div className="myBox">
          <div className="editItem">
            {edit ? (
              <MyEdit>
                <MyInput
                  {...nickBind}
                  onFocus={() =>
                    handleValid({ word: nickValue, label: "nickname" })
                  }
                />
                {valid.nickname ? null : (
                  <div className="validTxt">닉네임을 확인해주세요!!</div>
                )}
              </MyEdit>
            ) : (
              <MyTitleBg>{nickValue}</MyTitleBg>
            )}
            <MyBtn onClick={edit ? editNickname : handleEdit}>
              <PenIcon />
            </MyBtn>
            {edit ? (
              <MyBtn onClick={handleEdit}>
                <CloseIcon />
              </MyBtn>
            ) : null}
          </div>

          <MyTitleSm>비밀번호 변경</MyTitleSm>
          <div className="editItem">
            <MyEdit>
              <MyInput
                type="password"
                {...passBind}
                onFocus={() =>
                  handleValid({ word: passValue, label: "password" })
                }
                placeholder="비밀번호를 수정하세요"
              />
              {valid.password ? null : (
                <div className="validTxt">비밀번호를 확인해주세요!!</div>
              )}
            </MyEdit>
            <MyBtn onClick={valid ? editPassword : undefined}>
              <PenIcon />
            </MyBtn>
          </div>
          <MyBtn onClick={handleModal}>
            <span className="btnText">회원 탈퇴</span>
          </MyBtn>
        </div>
      </MyInfo>
      {modal ? (
        <UserModal
          alert={alert}
          handleModal={handleModal}
          deleteAccount={deleteAccount}
        />
      ) : null}
    </>
  );
}
