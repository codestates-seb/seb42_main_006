import logo from '../icons/logo.svg';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { StyledBtn } from './parts/Button';
import UserProfile from './parts/UserProfile';
import { AuthContext } from '../util/context/AuthContext';
import { useContext } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <HeaderStyle>
      <Logo src={logo} alt="logo" onClick={() => navigate('/')} />

      {auth?.isLogin ? (
        <UserProfile></UserProfile>
      ) : (
        <BtnWrapper>
          <Btn
            title="LOG IN"
            width=""
            height=""
            radius="0.5rem"
            fontWeight={400}
            fontColor="white"
            btnType="full"
            handleClick={() => navigate('/login')}
          ></Btn>
          <Btn
            title="SIGN UP"
            width=""
            height=""
            radius="0.5rem"
            fontWeight={400}
            fontColor="pink"
            btnType="empty"
            handleClick={() => navigate('/signup')}
          ></Btn>
        </BtnWrapper>
      )}
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  height: 3.7rem;
  padding: 0 1rem;
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

const Logo = styled.img`
  height: 90%;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 70%;
`;

const Btn = styled(StyledBtn)`
  padding: 0.5rem 1.5rem;
`;
