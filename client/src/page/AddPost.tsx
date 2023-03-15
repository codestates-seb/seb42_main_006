import styled from "styled-components";

import Selection from "../conponent/parts/Selection";
import {
  DefaultInput,
  ButtonInput,
  Textarea,
  TagInput,
} from "../conponent/parts/InputNoH";
import MapSearch from "../conponent/MapSearch";
import Tag from "../conponent/parts/Tag";
import { StyledBtn } from "../conponent/parts/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

const Background = styled.div`
  margin: 24px auto;
  max-width: 900px;
  min-width: 300px;
  border: 2px solid #5a5959;
  background-color: #222222;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Category = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: #ffffff;
    > select {
      font-size: 1rem;
      color: #ffffff;
    }
  }

  > h1 {
    font-size: 2rem;
    color: #ffffff;
    font-weight: 400;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    color: #ffffff;
    margin-bottom: 10px;
    font-weight: 500;
  }

  > div {
    margin-bottom: 20px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

function AddPost() {
  const [curCategory, setCurCategory] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleAddTags = (x: string) => {
    setTags((prev) => [...prev, x]);
  };
  const handleDeleteTags = () => {
    setTags((prev) => [...prev].slice(0, prev.length - 1));
  };

  return (
    <Background>
      <Category>
        <h1>게시글 작성하기</h1>
        <div>
          <span>Category</span>
          <Selection
            width="100px"
            opt={["영화", "음악", "맛집"]}
            setCategory={setCurCategory}
          ></Selection>
        </div>
      </Category>
      <FormWrapper>
        <span>Title</span>
        <DefaultInput width="100%" placeholder="Title ..."></DefaultInput>
        {curCategory === "영화" && (
          <>
            <span>Movie Urls</span>
            <DefaultInput
              width="100%"
              placeholder="Movie Urls ..."
            ></DefaultInput>
          </>
        )}
        {curCategory === "음악" && (
          <>
            <span>Playlist Urls</span>
            <ButtonInput
              title="Add list"
              width="100%"
              placeholder="Urls ..."
              handleClick={() => console.log("input btn")}
            ></ButtonInput>
          </>
        )}
        {curCategory === "맛집" && (
          <>
            <span>Location</span>
            <MapSearch></MapSearch>
          </>
        )}
        <span>Body</span>
        <Textarea
          width="100%"
          value={body}
          setValue={setBody}
          placeholder="내용을 입력해주세요."
        ></Textarea>
        <span>Tags</span>
        <TagInput
          width="100%"
          addTags={handleAddTags}
          deleteTags={handleDeleteTags}
        >
          {tags.map((x) => (
            <Tag title={x} key={x}></Tag>
          ))}
        </TagInput>
      </FormWrapper>
      <BtnWrapper>
        <StyledBtn
          title="Submit"
          width="100px"
          height="36px"
          radius="1000px"
          fontWeight={400}
          fontColor="white"
          btnType="full"
          handleClick={() => console.log(body)}
        ></StyledBtn>
        <StyledBtn
          title="Cancel"
          width="100px"
          height="36px"
          radius="1000px"
          fontWeight={400}
          fontColor="pink"
          btnType="empty"
          handleClick={() => navigate("/posts")}
        ></StyledBtn>
      </BtnWrapper>
    </Background>
  );
}

export default AddPost;
