import { useState } from "react";
import styled from "styled-components";
import { StyledBtn } from "./parts/Button";
import { Textarea } from "./parts/InputNoH";

import { requestAuth } from "../function/request";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: right;
  margin: 1rem 0;
`;

export default function CommentCreator() {
  const [commentValue, setCommetValue] = useState("");

<<<<<<< HEAD
=======
  const handleClick = () => {
    requestAuth
      .post("/prf-comments/{prf-post-id}", { content: commentValue })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

>>>>>>> da10ffba6d727371f01e410680d5b56adbe6b040
  return (
    <Content>
      <ContentWapper>
        {/* <ReTweet placeholder="댓글을 작성하세요"></ReTweet> */}
        <Textarea
          width="100%"
          value={commentValue}
          setValue={setCommetValue}
          placeholder="댓글을 입력해주세요"
          row={3}
        ></Textarea>
        <SubmitBtn>
          <StyledBtn
            title="댓글 작성"
            width="80px"
            height="30px"
            radius="5px"
            fontWeight={400}
            fontColor="white"
            btnType="full"
            handleClick={handleClick}
          ></StyledBtn>
        </SubmitBtn>
      </ContentWapper>
    </Content>
  );
}
