import styled from "styled-components";
import Comment from "./Comment";
import { useEffect } from "react";
import { requestAuth } from "../../function/request";
import { useState } from "react";

const UserRetweets = styled.div`
  display: flex;
  margin-top: 10px;
  color: white;
  font-size: 0.8rem;
  width: 100%;
  position: relative;
  flex-direction: column;
`;

export interface Props {
  id: number;
  content: string;
  createAt: string;
  modifiedAt: string;
  memberId: number;
  nickname: string;
}

interface ICommentListProps {
  postId: number;
  from: "posts" | "collect";
  reRender: {};
}

function CommentList({ postId, from, reRender }: ICommentListProps) {
  const [comment, setComment] = useState<Props[]>([]);
  const [render, setRender] = useState({});

  useEffect(() => {
    requestAuth
      .get(
        `${
          from === "collect" ? "/recruit-comments/" : "/prf-comments/"
        }${postId}`,
      )
      .then((res) => {
        setComment(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render, reRender]);

  return (
    <UserRetweets>
      {comment.length > 0 &&
        comment.map((item) => {
          return (
            <Comment
              item={item}
              parentId={postId}
              key={item.id}
              from={from}
              setRender={setRender}
            ></Comment>
          );
        })}
    </UserRetweets>
  );
}

export default CommentList;
