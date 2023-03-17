import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { ValidInput } from "../conponent/parts/Input";
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

function Login() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (emailValid && passwordValid) {
      request
        .post("/members/login", {
          username: email,
          password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            sessionStorage.setItem("auth", res.headers["authorization"]);
            sessionStorage.setItem("user", JSON.stringify(res.data));
            navigate("/posts");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Wrapper>
      <Background>
        <h1>Log In</h1>
        <FormWrapper>
          <span>Email</span>
          <ValidInput
            width="100%"
            height="40px"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            valid={emailValid}
            setValid={setEmailValid}
            errorMsg={"이메일을 확인해주세요."}
            validFn={(x) => validFn("email")(x)}
          ></ValidInput>

          <span>Password</span>
          <ValidInput
            width="100%"
            height="40px"
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
            valid={passwordValid}
            setValid={setPasswordValid}
            errorMsg="비밀번호를 확인해주세요."
            validFn={(x) => validFn("password")(x)}
          ></ValidInput>

          <StyledBtn
            width="100%"
            height="40px"
            title={"Sign Up"}
            radius="4px"
            handleClick={handleLogin}
            btnType={"full"}
            fontColor={"white"}
            fontWeight={600}
          ></StyledBtn>
        </FormWrapper>
      </Background>
    </Wrapper>
  );
}

export default Login;
