import logo from "../img/logo.svg";

import { useNavigate } from "react-router";
import styled from "styled-components";

import { SearchInput } from "./parts/Input";
import { StyledBtn } from "./parts/Button";

const HeaderStyle = styled.div`
  height: 3.5rem;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  gap: 10px;
  z-index: 1000;
  --tw-bg-opacity: 1;
  background-color: rgb(21 21 21);
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <img src={logo} alt="logo" />
      <SearchInput
        width="50%"
        height="36px"
        placeholder="제목 또는 태그로 검색"
      ></SearchInput>
      <BtnWrapper>
        <StyledBtn
          title="LOG IN"
          width="100px"
          height="36px"
          radius="10px"
          fontWeight={400}
          fontColor="white"
          btnType="full"
          handleClick={() => navigate("/login")}
        ></StyledBtn>
        <StyledBtn
          title="SIGN UP"
          width="100px"
          height="36px"
          radius="10px"
          fontWeight={400}
          fontColor="pink"
          btnType="empty"
          handleClick={() => navigate("/signup")}
        ></StyledBtn>
      </BtnWrapper>
    </HeaderStyle>
  );
}
