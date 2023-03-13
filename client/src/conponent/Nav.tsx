import PageButton from "./parts/PageButton";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: white;
  width: 160px;
  height: calc(100vh - 70px);
  background-color: #222222;
  border-radius: 0 15px 0 0;
  padding-top: 10px;
  position: sticky;
  top: 70px;
  left: -160px;
  padding-left: 10px;
`;

export default function Nav() {
  return (
    <Content>
      <PageButton
        title="Main"
        handleClick={(e: any) => console.log(e.target.textContent)}
      ></PageButton>
      <PageButton
        title="Story"
        handleClick={(e: any) => console.log(e.target.textContent)}
      ></PageButton>
      <PageButton
        title="Together"
        handleClick={(e: any) => console.log(e.target.textContent)}
      ></PageButton>
      <PageButton
        title="My page"
        handleClick={(e: any) => console.log(e.target.textContent)}
      ></PageButton>
    </Content>
  );
}
