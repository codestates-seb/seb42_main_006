import React from "react";
import styled from "styled-components";
import { DefaultInput } from "../conponent/parts/InputNoH";
import { useState } from "react";
import { Textarea } from "../conponent/parts/InputNoH";
import { TagInput } from "../conponent/parts/InputNoH";
import Tag from "../conponent/parts/Tag";
import Selection from "../conponent/parts/Selection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1000px;
  width: 800px;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 25rem;
`;

const Header = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 1.8rem;
  padding: 10px;
`;

export default function CollectPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [curCategory, setCurCategory] = useState("");

  const handleAddTags = (x: string) => {
    setTags((prev) => [...prev, x]);
  };
  const handleDeleteTags = () => {
    setTags((prev) => [...prev].slice(0, prev.length - 1));
  };

  return (
    <>
      <Container>
        <Header>모집하기 글 작성</Header>
        <div>
          <div>제목</div>
          <DefaultInput
            width="100%"
            placeholder="제목"
            value={title}
            setValue={setTitle}
          ></DefaultInput>
        </div>
        <div>
          <div>내용</div>
          <Textarea
            width="100%"
            value={body}
            setValue={setBody}
            placeholder="내용을 입력해주세요."
          ></Textarea>
        </div>
        <div>
          <div>
            <div>모집인원</div>
            <Selection
              width=""
              opt={["2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              setCategory={setCurCategory}
            ></Selection>
          </div>
          <div>
            <div>연령대</div>
            <div>레디오 체크 박스</div>
          </div>
        </div>
        <div>
          <div>모집기한</div>
          <div>
            <div>모집기한 표시 공간</div>
            <div>달력 아이콘</div>
          </div>
        </div>
        <div>
          <div>태그</div>
          <TagInput
            width="100%"
            addTags={handleAddTags}
            deleteTags={handleDeleteTags}
          >
            {tags.map((x, idx) => (
              <Tag title={x} key={idx}></Tag>
            ))}
          </TagInput>
        </div>
      </Container>
    </>
  );
}
