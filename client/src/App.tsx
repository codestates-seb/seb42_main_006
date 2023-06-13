import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './style/GlobalStyles';
import NotFound from './page/NotFound';
import Header from './conponent/Header';
import Nav from './conponent/Nav';
import Example from './page/Example';
import Signup from './page/Signup';
import Login from './page/Login';
import AddPost from './page/AddPost';
import Posts from './page/Posts';
import Collect from './page/Collect';
import CollectDeatail from './page/CollectDeatail';
import Mypage from './page/Mypage';
import Main from './page/Main';
import PostDetail from './page/PostDetail';
import CollectPost from './page/CollectPost';
import ModalContextProvider from './conponent/Modal/ModalContextProvider';
import AuthContextProvider from './util/context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Header />
          <MainWrapper>
            <Nav />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/example" element={<Example />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/collect" element={<Collect />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addpost/:mode/" element={<AddPost />} />
                <Route path="/collectdeatail/:id" element={<CollectDeatail />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/postdetail/:id" element={<PostDetail />} />
                <Route path="/collectpost/:mode/:id" element={<CollectPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ContentWrapper>
          </MainWrapper>
        </BrowserRouter>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default App;

const MainWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  min-height: calc(100vh - 3.5rem);
`;
