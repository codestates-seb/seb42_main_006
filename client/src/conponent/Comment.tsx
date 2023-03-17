import styled from "styled-components";
import IconBtn from "../conponent/parts/IconButton";
import { StyledBtn } from "../conponent/parts/Button";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  color: white;
`;

const ReTweet = styled.textarea`
  height: 10rem;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  padding: 10px;
  color: #4a4a4a;
  margin-top: 2rem;
  margin-bottom: 1rem;
  background-color: inherit;
  width: 100%;
  resize: none;
  outline-color: #ff3366;
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: right;
`;

const User = styled.div`
  font-weight: bold;
`;

const UserRetweet = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const UserRetweets = styled.div`
  display: flex;
  margin-top: 10px;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #4a4a4a;
  color: white;
  font-size: 0.8rem;
  width: 100%;
  position: relative;
`;

export default function CommentCreator() {
  return (
    <Content>
      <ContentWapper>
        <ReTweet placeholder="댓글을 작성하세요"></ReTweet>
        <SubmitBtn>
          <StyledBtn
            title="댓글 작성"
            width="80px"
            height="30px"
            radius="5px"
            fontWeight={400}
            fontColor="white"
            btnType="full"
            handleClick={() => console.log("click")}
          ></StyledBtn>
        </SubmitBtn>
        <UserRetweets>
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
        </UserRetweets>
      </ContentWapper>
    </Content>
  );
}
