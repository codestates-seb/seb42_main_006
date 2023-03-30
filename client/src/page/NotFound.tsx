import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Background = styled.div`
  width: 70vw;
  height: 300px;
  margin: auto;
  max-width: 1000px;
  min-width: 300px;
  border: 2px solid #5a5959;
  background-color: #222222;
  border-radius: 15px;
  padding: auto;
  display: flex;

  > h1 {
    margin: auto;
    font-size: 2.5rem;
    color: #4e4e4e;
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <Background>
        <h1>404 NOT FOUND...🔥🔥🔥</h1>
      </Background>
    </Wrapper>
  );
}

export default NotFound;
