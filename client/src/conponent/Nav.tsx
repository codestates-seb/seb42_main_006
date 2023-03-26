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

interface NavType {
  isLogin: boolean;
}

export default function Nav({ isLogin }: NavType) {
  const navigate = useNavigate();

  console.log(isLogin);

  const hadleNav = () => {
    isLogin ? navigate("/mypage") : navigate("/login");
  };

  return (
    <Content>
      <PageButton title="Main" handleClick={() => navigate("/")} />
      <PageButton title="Story" handleClick={() => navigate("/posts")} />
      <PageButton title="Together" handleClick={() => navigate("/collect")} />
      <PageButton title="My page" handleClick={hadleNav} />
    </Content>
  );
}
