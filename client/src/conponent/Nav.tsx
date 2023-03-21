import PageButton from "./parts/PageButton";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-weight: bold;
  color: white;
  width: 160px;
  height: calc(100vh - 70px);
  background-color: #222222;
  border-radius: 0 15px 0 0;
  padding-top: 10px;
  position: sticky;
  top: 70px;
  left: 0;
  padding-left: 10px;
`;

export default function Nav() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("auth");

  const hadleNav = () => {
    token ? navigate("/mypage") : navigate("/login");
  };

  return (
    <Content>
      <PageButton title="Main" handleClick={() => navigate("/")}></PageButton>
      <PageButton
        title="Story"
        handleClick={() => navigate("/posts")}
      ></PageButton>
      <PageButton
        title="Together"
        handleClick={() => navigate("/collect")}
      ></PageButton>
      <PageButton title="My page" handleClick={hadleNav}></PageButton>
    </Content>
  );
}
