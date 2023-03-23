import styled from "styled-components";

import { UserProfileImg } from "../../icons/Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
  > svg {
    height: 70%;
    width: auto;
  }
  > span {
    font-size: 1.2rem;
    color: #f36;
  }
`;

function UserProfile() {
  return (
    <Wrapper>
      <UserProfileImg></UserProfileImg>
      <span>
        {JSON.parse(sessionStorage.getItem("user") as string).nickName}
      </span>
    </Wrapper>
  );
}

export default UserProfile;
