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
  width: 100%;
  color: white;
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: right;
  margin: 1rem 0;
`;

interface IcommentCreatorProp {
  handleSubmit: (x: { content: string }) => void;
}

export default function CommentCreator({ handleSubmit }: IcommentCreatorProp) {
  const [commentValue, setCommetValue] = useState("");

  const handleClick = () => {
    handleSubmit({ content: commentValue });
    setCommetValue("");
  };

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
