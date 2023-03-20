import styled from "styled-components";
import MoviePreview from "../conponent/addPost/MoviePreview";
import PlaylistMaker from "../conponent/addPost/PlaylistMaker";
import Selection from "../conponent/parts/Selection";
import { DefaultInput, Textarea, FileInput } from "../conponent/parts/InputNoH";
import MapSearch from "../conponent/addPost/MapSearch";
import { StyledBtn } from "../conponent/parts/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

import { getVideoId } from "../function/youtubeApi";

interface Iurls {
  url: string;
  thumbnail: string;
  title: string;
}

export default function AddPost() {
  const [curCategory, setCurCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string>("");
  const [urls, setUrls] = useState<Iurls[]>([]);
  const [file, setfile] = useState<File>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latLon, setLatLon] = useState<{ lat: string; lon: string }>({
    lat: "",
    lon: "",
  });
  const navigate = useNavigate();

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
        <Title>게시글 작성하기</Title>
        <CategoryWrapper>
          <CategoryTitle>카테고리</CategoryTitle>
          <Selection
            width=""
            opt={["영화", "음악", "맛집"]}
            setCategory={setCurCategory}
          ></Selection>
        </CategoryWrapper>
      </Category>
      <FormWrapper>
        <InputTitle>제목</InputTitle>
        <DefaultInput
          width="100%"
          placeholder="제목"
          value={title}
          setValue={setTitle}
        ></DefaultInput>
        {(() => {
          switch (curCategory) {
            case "영화":
              return <MoviePreview urls={urls} handleAddUrls={handleAddUrls} />;
            case "음악":
              return (
                <PlaylistMaker
                  urls={urls}
                  setUrls={setUrls}
                  onAddList={handleAddUrls}
                />
              );
            case "맛집":
              return (
                <>
                  <MapSearch setLatLon={setLatLon} />
                  <InputTitle>사진</InputTitle>
                  <FileInput
                    width="100%"
                    value={file}
                    setValue={setfile}
                  ></FileInput>
                </>
              );
            default:
              return;
          }
        })()}
        <InputTitle>내용</InputTitle>
        <Textarea
          width="100%"
          value={body}
          setValue={setBody}
          placeholder="내용을 입력해주세요."
          row={10}
        ></Textarea>
        <InputTitle>태그</InputTitle>
        <DefaultInput
          width="100%"
          value={tags}
          setValue={setTags}
          placeholder="#tag1, #tag2, #tag3 ..."
        ></DefaultInput>
        <pre>{body}</pre>
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
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  font-weight: 400;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #ffffff;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 20px;
  }
  > pre {
    width: 300px;
    white-space: pre-wrap;
    word-break: break-word;
    overflow: auto;
  }
`;

const CategoryTitle = styled.span`
  color: #fff;
  font-weight: 500;
`;

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
