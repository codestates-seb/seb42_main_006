import styled from "styled-components";
import CollectItem from "../conponent/collect/CollectItem";

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
        {/* <PostsSort> */}
        <CollectItem />
        <CollectItem />
        <CollectItem />
        {/* </PostsSort> */}
      </PostsContent>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  color: white;
  width: 90%;
  max-width: 800px;
`;

const PostsContent = styled.div`
  width: 90%;
  max-width: 800px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

// const PostsSort = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between; /* space-between으로 변경 */
//   width: 500px;
//   /* border: 1px solid #4a4a4a; */
//   border-radius: 5px;
//   background-color: #222222;
//   padding: 10px; /* 3개의 간격을 주기 위해 padding을 추가 */
// `;
