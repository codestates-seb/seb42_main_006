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
        <CollectItem />
        <CollectItem />
        <CollectItem />
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
