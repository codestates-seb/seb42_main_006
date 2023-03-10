import GlobalStyle from "./style/GlobalStyles";
import Header from "./conponent/Header";
import Nav from "./conponent/Nav";
import Example from "./page/Example";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <MainWrapper>
        <Nav></Nav>
        <Routes>
          <Route path="/example" element={<Example />}></Route>
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
