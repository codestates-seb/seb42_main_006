import { useState } from "react";
import styled from "styled-components";
import logo from "../../img/logo.svg";
import { PenIcon, CloseIcon } from "../../icons/MyIcon";
import useInput from "../../util/MyInput";
import { useNavigate } from "react-router";

const MyInfo = styled.section`
  display: flex;
  margin-bottom: 4rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  h4 {
    display: flex;
    margin-bottom: 0.5rem;
    gap: 0.4rem;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 400;
    input {
      margin: 0;
    }
  }
  h5 {
    font-size: 0.75rem;
    font-weight: 500;
    color: #3c3c3c;
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
  img {
    width: 3rem;
    height: 3rem;
  }
`;

const MyEdit = styled.div`
  display: flex;
  gap: 0.33rem;
  align-items: center;
`;

const MyInput = styled.input`
  width: 12rem;
  margin: 0.5rem 0;
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
  span {
    display: block;
    margin: 0.33rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.025em;
  }
`;

export default function UserEdit() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [nickValue, nickBind, nickReset] = useInput("닉네임123");
  const [passValue, passBind, passReset] = useInput("");

  const handleEdit = () => {
    setEdit(!edit);
    nickReset("닉네임123");
    passReset("");
  };

  const editPassword = () => {
    console.log(passValue);
    passReset("");
  };

  const editNickname = () => {
    console.log(nickValue);
    setEdit(!edit);
    nickReset("닉네임123");
  };

  const deleteAccount = () => {
    console.log("회원 탈퇴");
    navigate("/");
  };

  return (
    <MyInfo>
      <MyProfile>
        <img src={logo} alt="logo" />
      </MyProfile>
      <div>
        <h4>
          {edit ? (
            <MyEdit>
              <MyInput {...nickBind} />
            </MyEdit>
          ) : (
            "닉네임123"
          )}
          <MyBtn onClick={edit ? editNickname : handleEdit}>
            <PenIcon width="1.15rem" height="1.15rem" />
          </MyBtn>
          {edit ? (
            <MyBtn onClick={handleEdit}>
              <CloseIcon width="1.15rem" height="1.15rem" />
            </MyBtn>
          ) : null}
        </h4>

        <h5>비밀번호 변경</h5>
        <MyEdit>
          <MyInput {...passBind} placeholder="비밀번호를 수정하세요" />
          <MyBtn onClick={editPassword}>
            <PenIcon width="1.15rem" height="1.15rem" />
          </MyBtn>
        </MyEdit>
        <MyBtn onClick={deleteAccount}>
          <span>회원 탈퇴</span>
        </MyBtn>
      </div>
    </MyInfo>
  );
}
