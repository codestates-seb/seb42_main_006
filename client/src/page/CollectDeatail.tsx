import styled from "styled-components";
import IconBtn from "../conponent/parts/IconButton";
import { StyledBtn } from "../conponent/parts/Button";
import Tag from "../conponent/parts/Tag";

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

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
`;

const TopInfoLeft = styled.div`
  display: flex;
`;

const TopInfoRight = styled.div`
  display: flex;
`;

const DetailPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 300px;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  padding: 30px;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 770px;
`;

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TagInfo = styled.div`
  display: flex;
`;

const TagRight = styled.div`
  margin-top: 2px;
  margin-right: 5px;
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

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const DetailContent = styled.div`
  display: flex;
  width: 700px;
  padding-left: 10px;
`;

const UserName = styled.div`
  margin-left: 0.5rem;
  padding-top: 0.4rem;
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

export default function CollectDeatail() {
  return (
    <Content>
      <ContentWapper>
        <TopInfo>
          <TopInfoLeft>
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
            <UserName>잘생긴 라마</UserName>
          </TopInfoLeft>
          <TopInfoRight>
            <TagRight>
              <IconBtn
                title="12"
                width="50px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="white"
                btnType=""
                iconType="heart"
                handleClick={() => console.log("click")}
              />
            </TagRight>
            <TagRight>
              <StyledBtn
                title="참가 인원 3/5"
                width="100px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="pink"
                btnType="empty"
                handleClick={() => console.log("click")}
              ></StyledBtn>
            </TagRight>
            <TagRight>
              <StyledBtn
                title="게시물 보러가기"
                width="110px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="white"
                btnType="full"
                handleClick={() => console.log("click")}
              ></StyledBtn>
            </TagRight>
          </TopInfoRight>
        </TopInfo>
        <DetailPost>
          <TitleContent>
            <Title>성수동 뇨끼바 가실분 구합니다.</Title>
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
              handleClick={() => console.log("click")}
            />
          </TitleContent>
          <DetailContent>
            성수동에 유명한 뇨끼바 있다고 게시판에 확인 했습니다. 2023/03/31
            가실분 구합니다. 같이하기 눌러주시고 댓글 달아주세요~ ....
          </DetailContent>
        </DetailPost>
        <Tags>
          <TagInfo>
            <TagRight>
              <Tag title="맛집"></Tag>
            </TagRight>
            <TagRight>
              <Tag title="20대"></Tag>
            </TagRight>
            <TagRight>
              <Tag title="모집기한: 2023/03/31"></Tag>
            </TagRight>
          </TagInfo>
          <StyledBtn
            title="함께하기"
            width="100px"
            height="30px"
            radius="50px"
            fontWeight={400}
            fontColor="pink"
            btnType="empty"
            handleClick={() => console.log("click")}
          ></StyledBtn>
        </Tags>
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
