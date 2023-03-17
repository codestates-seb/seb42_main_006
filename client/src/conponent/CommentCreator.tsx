import { useState } from "react";
import styled from "styled-components";
import { StyledBtn } from "./parts/Button";
import { Textarea } from "./parts/InputNoH";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  color: white;
`;

const ReTweet = styled.textarea`
  height: 10rem;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 1rem;
  background-color: inherit;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  resize: none;
  outline: none;

  &:focus {
    border-color: #f36;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: right;
  margin: 1rem 0;
`;

export default function CommentCreator() {
  const [commentValue, setCommetValue] = useState("");
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
            handleClick={() => console.log("click")}
          ></StyledBtn>
        </SubmitBtn>
      </ContentWapper>
    </Content>
  );
}
