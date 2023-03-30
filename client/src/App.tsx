import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./style/GlobalStyles";
import NotFound from "./page/NotFound";
import Header from "./conponent/Header";
import Nav from "./conponent/Nav";
import Example from "./page/Example";
import Signup from "./page/Signup";
import Login from "./page/Login";
import AddPost from "./page/AddPost";
import Posts from "./page/Posts";
import Collect from "./page/Collect";
import CollectDeatail from "./page/CollectDeatail";
import Mypage from "./page/Mypage";
import Main from "./page/Main";
import PostDetail from "./page/PostDetail";
import CollectPost from "./page/CollectPost";
import ModalContextProvider from "./conponent/Modal/ModalContextProvider";

const MainWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  min-height: calc(100vh - 3.5rem);
`;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("auth") !== null) {
      setIsLogin(true);
    }
  }, [setIsLogin]);

  return (
    <ModalContextProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Header setIsLogin={setIsLogin} />
        <MainWrapper>
          <Nav isLogin={isLogin} />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Main isLogin={isLogin} />}></Route>
              <Route path="/example" element={<Example />}></Route>
              <Route path="/posts" element={<Posts />}></Route>
              <Route path="/collect" element={<Collect />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route
                path="/login"
                element={<Login setIsLogin={setIsLogin} />}
              ></Route>
              <Route path="/addpost/:mode/" element={<AddPost />}></Route>
              <Route
                path="/collectdeatail/:id"
                element={<CollectDeatail />}
              ></Route>
              <Route path="/mypage" element={<Mypage />}></Route>
              <Route path="/postdetail/:id" element={<PostDetail />}></Route>
              <Route
                path="/collectpost/:mode/:id"
                element={<CollectPost />}
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </ContentWrapper>
        </MainWrapper>
      </BrowserRouter>
    </ModalContextProvider>
  );
}

export default App;
