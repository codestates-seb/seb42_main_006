import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import MoviePreview from "../conponent/addPost/MoviePreview";
import PlaylistMaker from "../conponent/addPost/PlaylistMaker";
import Selection from "../conponent/parts/Selection";
import MapSearch from "../conponent/addPost/MapSearch";
import { DefaultInput, Textarea, FileInput } from "../conponent/parts/InputNoH";
import { StyledBtn } from "../conponent/parts/Button";
import { requestAuth } from "../function/request";
import { submitUrl, UpdateImg, UploadImg } from "../util/PostApi";
import { getVideoId } from "../function/youtubeApi";
import { validFn } from "../function/validFn";
import { IYoutubeInfo as Iurls } from "../util/PostApi";
import { IPostSubmitData as Idata } from "../util/PostApi";
import { IEditData } from "../util/PostApi";

export default function AddPost() {
  const [curCategory, setCurCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string>("");
  const [urls, setUrls] = useState<Iurls[]>([]);
  const [origin, setOrigin] = useState<any>(null);
  const [file, setfile] = useState<File>();
  const [imageKey, setImageKey] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latLon, setLatLon] = useState<{ lat: string; lon: string }>({
    lat: "37.49652290597856",
    lon: "127.02479374965135",
  });

  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (param.mode === "edit") {
      console.log(location.state);
      setOrigin(location.state);
      setTitle(location.state.title);
      setBody(location.state.content);
      setTags(location.state.tags);
      setUrls([...location.state.urls]);
      setCurCategory(location.state.category);
      setLatLon({
        lat: location.state.urls[0].url,
        lon: location.state.urls[0].thumbnail,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (file) {
      if (param.mode === "create") {
        UploadImg(file)
          .then((res) => {
            console.log(res);
            setImageKey(res.fileKey);
          })
          .catch((err) => console.log(err));
      } else {
        UpdateImg(file, origin.imageKey)
          .then((res) => {
            console.log(res);
            setImageKey(res.fileKey);
          })
          .catch((err) => console.log(err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleDelUrls = (item: string) => {
    setUrls([...urls.filter((x) => x.url !== item)]);
  };

  const handleAddUrls = (youtubeUrl: string) => {
    if (!validFn("youtubeUrl")(youtubeUrl)) {
      alert("Youtube Url만 이용 가능합니다.");
      return;
    }

    if (urls.filter((x) => x.url === youtubeUrl).length !== 0) {
      alert("중복된 Url은 등록하실 수 없습니다.");
      return;
    }

    const url: Iurls = { url: "", thumbnail: "", title: "" };

    getVideoId(youtubeUrl)
      .then((res) => {
        url.url = youtubeUrl;
        url.thumbnail = res.items[0].snippet.thumbnails.default.url;
        url.title = res.items[0].snippet.title;
      })
      .then(() => setUrls((prev) => [url, ...prev]))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (param.mode === "create") {
      const data: Idata = {
        title: title,
        category: curCategory,
        urls: submitUrl("create", curCategory, urls, latLon),
        content: body,
        tags: tags,
      };
      if (imageKey) data.imageKey = imageKey;
      try {
        const res = await requestAuth.post("/prf-posts", data);
        console.log(res);
        if (res.data.id) navigate(`/postdetail/${res.data.id}`);
      } catch (err) {
        alert(err);
      }
    } else if (param.mode === "edit") {
      const [newUrl, delUrl] = submitUrl(
        "edit",
        curCategory,
        urls,
        latLon,
        origin,
      );
      const data: IEditData = {
        title: title,
        category: curCategory,
        newUrls: newUrl,
        deletedUrls: delUrl,
        content: body,
        tags: tags,
      };
      if (imageKey) data.imageKey = imageKey;
      try {
        const res = await requestAuth.patch(
          `/prf-posts/${location.state.id}`,
          data,
        );
        console.log(res);
        if (res.data.id) navigate(`/postdetail/${res.data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Background>
      <Category>
        <Title>게시글 작성하기</Title>
        <CategoryWrapper>
          <CategoryTitle>카테고리</CategoryTitle>
          <Selection
            width=""
            value={curCategory}
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
                  onDelList={handleDelUrls}
                />
              );
            case "맛집":
              return (
                <>
                  <MapSearch latLon={latLon} setLatLon={setLatLon} />
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
          placeholder="#tag1#tag2#tag3 ..."
        ></DefaultInput>
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
          handleClick={handleSubmit}
        ></StyledBtn>
        <StyledBtn
          title="Cancel"
          width="100px"
          height="36px"
          radius="1000px"
          fontWeight={400}
          fontColor="pink"
          btnType="empty"
          handleClick={() => navigate(-1)}
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
