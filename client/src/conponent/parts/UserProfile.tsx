import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { requestAuth } from "../../function/request";

import { UserProfileImg } from "../../icons/Icon";
import useOuterClick from "../../util/useOuterClick";

const Wrapper = styled.div`
  height: 100%;
  /* overflow: hidden; */
  position: relative;
`;

const UserProfileWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  > svg {
    height: 70%;
    width: auto;
  }
  > span {
    font-size: 1.2rem;
    color: #f36;
  }
`;

interface IlogoutContainer {
  display: boolean;
}
const LogoutContainer = styled.div<IlogoutContainer>`
  /* position: absolute; */
  position: relative;
  right: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.display ? "90%" : "0px")};
  overflow: hidden;
  transition: 0.3s ease-in-out;
  border: 2px solid #f36;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: inset 0 2px 4px -2px #f36;
  background-color: #151515;
`;

const LogoutBtn = styled.button`
  outline: none;
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 12px;
  background-color: transparent;
  font-size: 1rem;
  color: #f36;
`;

function UserProfile() {
  const [trig, setTrig] = useState(false);
  const innerRef = useOuterClick(() => setTrig(false));
  const navigate = useNavigate();

  const logout = () => {
    requestAuth
      .post("/members/logout")
      .then((res) => {
        console.log(res);
        sessionStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper ref={innerRef}>
      <UserProfileWrapper onClick={() => setTrig(!trig)}>
        <UserProfileImg></UserProfileImg>
        <span>
          {JSON.parse(sessionStorage.getItem("user") as string).nickName}
        </span>
      </UserProfileWrapper>
      <LogoutContainer display={trig}>
        <LogoutBtn onClick={logout}>Log Out</LogoutBtn>
      </LogoutContainer>
    </Wrapper>
  );
}

export default UserProfile;
