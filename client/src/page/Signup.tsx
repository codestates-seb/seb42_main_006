import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { ValidInput } from "../conponent/parts/InputNoH";
import { StyledBtn } from "../conponent/parts/Button";

import { validFn } from "../function/validFn";
import { request } from "../function/request";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Background = styled.div`
  width: 30vw;
  margin: auto;
  max-width: 400px;
  min-width: 300px;
  /* border: 2px solid #5a5959;
  background-color: #222222; */
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > h1 {
    font-size: 2rem;
    color: #f36;
    font-weight: 400;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    color: #ffffff;
    margin-bottom: 10px;
    font-weight: 500;
  }

  > div {
    margin-bottom: 20px;
  }
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [nickname, setNickname] = useState("");
  const [nickValid, setNickValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatValid, setPasswordRepeatValid] = useState(true);
  const [emailCheck, setEmailCheck] = useState<boolean>();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (emailCheck === true) {
      if (
        emailCheck &&
        emailValid &&
        nickValid &&
        passwordValid &&
        passwordRepeatValid
      ) {
        request
          .post("/members/sign-up", { email, password, nickName: nickname })
          .then((res) => {
            if (res.status === 201) {
              navigate("/login");
            }
          })
          .then((err) => {});
      }
    } else {
      if (email.length > 0 && emailValid) {
        request
          .post("/members/email-check", { email })
          .then((res) => {
            if (res.status === 200) {
              setEmailCheck(true);
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              console.log(err);
              setEmailCheck(false);
              setEmailValid(false);
            }
          });
      }
    }
  };

  return (
    <Wrapper>
      <Background>
        <h1>Sign Up</h1>
        <FormWrapper>
          <span>Email</span>
          <ValidInput
            width="100%"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            valid={emailValid}
            setValid={setEmailValid}
            errorMsg={
              emailCheck === false
                ? "가입된 계정입니다."
                : "이메일을 확인해주세요."
            }
            validFn={(x) => validFn("email")(x)}
          ></ValidInput>

          {emailCheck === true && (
            <>
              <span>Nickname</span>
              <ValidInput
                width="100%"
                placeholder="Nickname"
                value={nickname}
                setValue={setNickname}
                valid={nickValid}
                setValid={setNickValid}
                errorMsg="닉네임을 확인해주세요."
                validFn={(x) => validFn("nickname")(x)}
              ></ValidInput>
              <span>Password</span>
              <ValidInput
                width="100%"
                placeholder="Password"
                type="password"
                value={password}
                setValue={setPassword}
                valid={passwordValid}
                setValid={setPasswordValid}
                errorMsg="비밀번호를 확인해주세요."
                validFn={(x) => validFn("password")(x)}
              ></ValidInput>
              <ValidInput
                width="100%"
                placeholder="Password 확인"
                type="password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                valid={passwordRepeatValid}
                setValid={setPasswordRepeatValid}
                errorMsg="비밀번호가 다릅니다."
                validFn={(x) => x === password}
                disable={password.length === 0 || !passwordValid}
              ></ValidInput>
            </>
          )}

          <StyledBtn
            width="100%"
            height="40px"
            title={emailCheck ? "Sign Up" : "Continue"}
            radius="4px"
            handleClick={handleSubmit}
            btnType={emailCheck ? "full" : "empty"}
            fontColor={emailCheck ? "white" : "pink"}
            fontWeight={600}
          ></StyledBtn>
        </FormWrapper>
      </Background>
    </Wrapper>
  );
}

export default Signup;
