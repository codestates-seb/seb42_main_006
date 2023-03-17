import styled from "styled-components";
import Comment from "./Comment";

const UserRetweets = styled.div`
  display: flex;
  margin-top: 10px;
  color: white;
  font-size: 0.8rem;
  width: 100%;
  position: relative;
`;

function CommentList() {
  return (
    <UserRetweets>
      <Comment></Comment>
    </UserRetweets>
  );
}

export default CommentList;
