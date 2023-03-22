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
`;

interface Props {
  id: number;
  content: string;
  createAt: string;
  modifiedAt: string;
  memberId: number;
  nickName: string;
}

function CommentList(props) {
  const data.id = props;
  const [comment, setComment] = useState<Props>({
    id: 1,
    content: "글이 좋아요",
    createAt: "2023-02-25T17:41:46",
    modifiedAt: "2023-02-25T18:26:13",
    memberId: 1,
    nickName: "홍길동",
  });

  useEffect(() => {
    requestAuth
      .get<Props[]>(`/recruit-comments/${comment.id}`)
      .then((res) => {
        setComment(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UserRetweets>
      <Comment id={props.id}></Comment>
    </UserRetweets>
  );
}

export default CommentList;
