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

export default function Collect() {
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
                radius="100px"
                fontWeight={400}
                fontColor=""
                btnType=""
                iconType="profile"
                border="none"
                handleClick={() => console.log("click")}
              />
            </div>
          </div>
          <PostDetail>
            <Title>성수동 뇨끼바 가실분 구합니다.</Title>
            <Tag title="맛집"></Tag>
            <Summary>
              서수동에 유명한 뇨끼바 있다고 게시판에 확인 했습니다. 2023/03/31
              가실분 구합니다. 같이하기 눌러주시고 댓글 달아주세요~ ....
            </Summary>
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
    </Content>
  );
}
