import styled from "styled-components";

import { UserProfileImg } from "../../icons/Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function UserProfile() {
  return (
    <Wrapper>
      <UserProfileImg></UserProfileImg>
      <span>Username</span>
    </Wrapper>
  );
}

export default UserProfile;
