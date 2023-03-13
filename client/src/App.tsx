import GlobalStyle from "./style/GlobalStyles";
import NotFound from "./page/NotFound";
import Header from "./conponent/Header";
import Nav from "./conponent/Nav";
import Example from "./page/Example";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 3.5rem);
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <MainWrapper>
        <Nav></Nav>
        <ContentWrapper>
          <Routes>
            <Route path="/example" element={<Example />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ContentWrapper>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
