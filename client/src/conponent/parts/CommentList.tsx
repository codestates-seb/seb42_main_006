import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const UserRetweets = styled.div`
  display: flex;
  margin-top: 10px;
  /* padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 10px;
  padding-right: 10px; */
  /* border-bottom: 1px solid #4a4a4a; */
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
