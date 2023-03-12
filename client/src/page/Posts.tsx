import IconBtn from "../conponent/parts/IconButton";
import Tag from "../conponent/parts/Tag";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Sort = styled.div`
  display: flex;
  margin-left: 15%;
  justify-content: flex-start;
  gap: 10px;
  color: white;
  width: 50%;
`;

const PostsContent = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostsSort = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* space-between으로 변경 */
  width: 500px;
  height: 150px;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  padding: 10px; /* 3개의 간격을 주기 위해 padding을 추가 */
`;

const PostDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 300px;
  margin-left: 0px; /* 왼쪽 여백을 20px로 설정 */
  margin-bottom: 20px;
  margin-top: 10px;
  padding-bottom: 5px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px; // 각 내부 div들에도 margin-bottom 속성을 추가합니다.
`;
const Summary = styled.div`
  font-size: 13px;
  color: #5a5959;
  margin-bottom: 5px;
  height: 70px;
  margin-top: 5px;
`;

const IconSort = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
`;

const AddPosition = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
`;

export default function Posts() {
  return (
    <Content>
      <Sort>
        <div>전체</div>
        <div>영화</div>
        <div>음악</div>
        <div>맛집</div>
      </Sort>
      <PostsContent>
        <PostsSort>
          <div>
            <div>
              <IconBtn
                title=""
                width="100px"
                height="100px"
                radius="5px"
                fontWeight={400}
                fontColor=""
                btnType=""
                iconType="noneImg"
                border="none"
                handleClick={() => console.log("click")}
              />
            </div>
          </div>
          <PostDetail>
            <Title>[성수동] 뇨끼바 라는 뇨끼 전문집</Title>
            <Summary>
              성수동에 기념일로 여자친구랑 뇨끼바를 갔습니다. 뇨끼 전문집이여서
              그런지 너무 맛있었네요 추천드립니다 한번 가보세요 ...
            </Summary>
            <Tag title="맛집"></Tag>
          </PostDetail>
          <IconSort>
            <IconBtn
              title=""
              width="60px"
              height="36px"
              radius="5px"
              fontWeight={400}
              fontColor="white"
              btnType=""
              iconType="heart"
              border="none"
              handleClick={() => console.log("click")}
            />
            <IconBtn
              title=""
              width="40px"
              height="40px"
              radius="5px"
              fontWeight={400}
              fontColor=""
              btnType=""
              iconType="retweet"
              border="none"
              handleClick={() => console.log("click")}
            />
          </IconSort>
        </PostsSort>
      </PostsContent>
      <AddPosition>
        <IconBtn
          title=""
          width="30px"
          height="30px"
          radius="100px"
          fontWeight={400}
          fontColor=""
          btnType="full"
          iconType="add"
          border="none"
          handleClick={() => console.log("click")}
        />
      </AddPosition>
    </Content>
  );
}
