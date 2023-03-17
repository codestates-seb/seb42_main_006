import styled from "styled-components";

import YoutubePlayer from "../conponent/parts/YoutubePlayer";
import YoutubeList from "../conponent/parts/YoutubeList";
import Selection from "../conponent/parts/Selection";
import {
  DefaultInput,
  ButtonInput,
  Textarea,
  TagInput,
  FileInput,
} from "../conponent/parts/InputNoH";
import MapSearch from "../conponent/MapSearch";
import Tag from "../conponent/parts/Tag";
import { StyledBtn } from "../conponent/parts/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

import { getVideoId } from "../function/youtubeApi";

const Background = styled.div`
  margin: 24px auto;
  max-width: 900px;
  min-width: 300px;
  /* border: 2px solid #5a5959; */
  /* background-color: #222222; */
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

const PlaylistWrapper = styled.div`
  border: 2px solid #5a5959;
  border-radius: 5px;
  overflow: overlay;

  min-height: 200px;
  max-height: 200px;

  &::-webkit-scrollbar-thumb {
    background-color: #ff3366;
    border-radius: 1000px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    width: 30px; /*스크롤바 뒷 배경 색상*/
  }
`;

interface Iurls {
  url: string;
  thumbnail: string;
  title: string;
}

function AddPost() {
  const [curCategory, setCurCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [urls, setUrls] = useState<Iurls[]>([]);
  const [file, setfile] = useState<any>();
  const navigate = useNavigate();

  const handleAddTags = (x: string) => {
    setTags((prev) => [...prev, x]);
  };
  const handleDeleteTags = () => {
    setTags((prev) => [...prev].slice(0, prev.length - 1));
  };

  const handleAddUrls = (x: string) => {
    const url: Iurls = { url: "", thumbnail: "", title: "" };
    getVideoId(x)
      .then((res) => {
        url.url = x;
        url.thumbnail = res.items[0].snippet.thumbnails.medium.url;
        url.title = res.items[0].snippet.title;
      })
      .then(() => setUrls((prev) => [url, ...prev]));
  };

  return (
    <Background>
      <Category>
        <h1>게시글 작성하기</h1>
        <div>
          <span>카테고리</span>
          <Selection
            width=""
            opt={["영화", "음악", "맛집"]}
            setCategory={setCurCategory}
          ></Selection>
        </div>
      </Category>
      <FormWrapper>
        <span>제목</span>
        <DefaultInput
          width="100%"
          placeholder="제목"
          value={title}
          setValue={setTitle}
        ></DefaultInput>
        {curCategory === "영화" && (
          <>
            <span>{curCategory} Urls</span>
            <ButtonInput
              title="Add list"
              width="100%"
              placeholder="Urls"
              handleClick={handleAddUrls}
            ></ButtonInput>
            {urls.length !== 0 && <YoutubePlayer item={urls[0]} />}
          </>
        )}
        {curCategory === "음악" && (
          <>
            <span>플레이리스트</span>
            <ButtonInput
              title="Add list"
              width="100%"
              placeholder="Urls ..."
              handleClick={handleAddUrls}
            ></ButtonInput>
            <PlaylistWrapper>
              <YoutubeList list={urls} setList={setUrls}></YoutubeList>
            </PlaylistWrapper>
          </>
        )}
        {curCategory === "맛집" && (
          <>
            <span>위치</span>
            <MapSearch></MapSearch>
          </>
        )}
        <span>내용</span>
        <Textarea
          width="100%"
          value={body}
          setValue={setBody}
          placeholder="내용을 입력해주세요."
          row={10}
        ></Textarea>
        <span>태그</span>
        <TagInput
          width="100%"
          addTags={handleAddTags}
          deleteTags={handleDeleteTags}
        >
          {tags.map((x, idx) => (
            <Tag title={x} key={idx}></Tag>
          ))}
        </TagInput>
        {curCategory === "맛집" && (
          <>
            <span>사진</span>
            <FileInput value={file} setValue={setfile}></FileInput>
          </>
        )}
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
