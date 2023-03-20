import { useState } from "react";
import styled from "styled-components";
import CommentCreator from "../CommentCreator";
import IconBtn from "./IconButton";

const User = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #4a4a4a;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const UserRetweet = styled.div`
  font-size: 0.9rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

function Comment() {
  const [showOptions, setShowOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
    setIsEdit(false);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <IconBtn
          title=""
          width="30px"
          height="30px"
          radius="100px"
          fontWeight={400}
          fontColor=""
          btnType=""
          iconType="profile"
          border="none"
          handleClick={() => console.log("click")}
        />
        <UserRetweet>
          <User>고양이</User>
          <div>성수동 맛집 저 참가합니다!!</div>
        </UserRetweet>
        <IconWrapper>
          {showOptions && (
            <>
              <IconBtn
                title=""
                width="40px"
                height="40px"
                radius="5px"
                fontWeight={400}
                fontColor="red"
                btnType=""
                iconType="write"
                border="none"
                handleClick={() => setIsEdit(!isEdit)}
              />
              <IconBtn
                title=""
                width="40px"
                height="40px"
                radius="5px"
                fontWeight={400}
                fontColor="blue"
                btnType=""
                iconType="delete"
                border="none"
                handleClick={() => console.log("")}
              />
            </>
          )}
          <IconBtn
            title=""
            width="40px"
            height="40px"
            radius="5px"
            fontWeight={400}
            fontColor="pink"
            btnType=""
            iconType="treeDot"
            border="none"
            handleClick={toggleOptions}
          />
        </IconWrapper>
      </ContentWrapper>
      {isEdit && <CommentCreator></CommentCreator>}
    </Wrapper>
  );
}

export default Comment;
