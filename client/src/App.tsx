import GlobalStyle from "./style/GlobalStyles";
import NotFound from "./page/NotFound";
import Header from "./conponent/Header";
import Nav from "./conponent/Nav";
import Example from "./page/Example";
import Signup from "./page/Signup";
import Login from "./page/Login";
import AddPost from "./page/AddPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Posts from "./page/Posts";
import Collect from "./page/Collect";
import CollectDeatail from "./page/CollectDeatail";
import Mypage from "./page/Mypage";
import Main from "./page/Main";
import PostDetail from "./page/PostDetail";
import CollectPost from "./page/CollectPost";

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
            <Route path="/" element={<Main />}></Route>
            <Route path="/example" element={<Example />}></Route>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/collect" element={<Collect />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/addpost" element={<AddPost />}></Route>
            <Route path="/collectdeatail" element={<CollectDeatail />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/postdetail" element={<PostDetail />}></Route>
            <Route path="/collectpost" element={<CollectPost />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ContentWrapper>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
