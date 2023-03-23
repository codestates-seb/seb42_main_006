import styled from "styled-components";
import MoviePreview from "../conponent/addPost/MoviePreview";
import PlaylistMaker from "../conponent/addPost/PlaylistMaker";
import Selection from "../conponent/parts/Selection";
import { DefaultInput, Textarea, FileInput } from "../conponent/parts/InputNoH";
import MapSearch from "../conponent/addPost/MapSearch";
import { StyledBtn } from "../conponent/parts/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { requestAuth } from "../function/request";
import { UpdateImg, UploadImg } from "../util/PostApi";

import { getVideoId } from "../function/youtubeApi";

export interface Iurls {
  id?: number;
  url: string;
  thumbnail: string;
  title: string;
}

interface Idata {
  title: string;
  category: string;
  urls: Iurls[];
  content: string;
  tags: string;
  imageKey?: string;
}

interface IEditData {
  title: string;
  category: string;
  newUrls: Iurls[];
  deletedUrls: { urlId: number }[];
  content: string;
  tags: string;
  imageKey?: string;
}

export default function AddPost() {
  const [curCategory, setCurCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string>("");
  const [urls, setUrls] = useState<Iurls[]>([]);
  const [origin, setOrigin] = useState<any>(null);
  const [file, setfile] = useState<File>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latLon, setLatLon] = useState<{ lat: string; lon: string }>({
    lat: "",
    lon: "",
  });

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (param.mode === "edit") {
      requestAuth.get(`/prf-posts/${param.id}`).then((res) => {
        console.log(res.data);
        setOrigin(res.data);
        setTitle(res.data.title);
        setBody(res.data.content);
        setTags(res.data.tags);
        setUrls([...res.data.urls]);
        setCurCategory(res.data.category);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelUrls = (item: string) => {
    setUrls([...urls.filter((x) => x.url !== item)]);
  };

  const handleAddUrls = (youtubeUrl: string) => {
    if (urls.filter((x) => x.url === youtubeUrl).length !== 0) {
      alert("중복된 Url은 등록하실 수 없습니다.");
      return;
    }

    const url: Iurls = { url: "", thumbnail: "", title: "" };

    getVideoId(youtubeUrl)
      .then((res) => {
        url.url = youtubeUrl;
        url.thumbnail = res.items[0].snippet.thumbnails.medium.url;
        url.title = res.items[0].snippet.title;
      })
      .then(() => setUrls((prev) => [url, ...prev]));
  };

  const handleSubmit = async () => {
    if (param.mode === "create") {
      if (curCategory === "영화") {
        const data: Idata = {
          title: title,
          category: curCategory,
          urls: [urls[0]],
          content: body,
          tags: tags,
        };
        const res = await requestAuth.post("/prf-posts", data);
        console.log(res);
        if (res.data.id) navigate("/");
      } else if (curCategory === "음악") {
        const data: Idata = {
          title: title,
          category: curCategory,
          urls: urls,
          content: body,
          tags: tags,
        };
        const res = await requestAuth.post("/prf-posts", data);
        console.log(res);
        if (res.data.id) navigate("/");
      } else {
        const imageKey = await UploadImg(file);
        if (imageKey) {
          const data: Idata = {
            title: title,
            category: curCategory,
            urls: [{ title: "", url: latLon.lat, thumbnail: latLon.lon }],
            content: body,
            tags: tags,
            imageKey: imageKey.fileKey,
          };
          const res = await requestAuth.post("/prf-posts", data);
          console.log(res);
          if (res.data.id) navigate("/");
        }
      }
    } else if (param.mode === "edit") {
      if (curCategory === "영화") {
        const data: IEditData = {
          title: title,
          category: curCategory,
          newUrls: [urls[0]],
          deletedUrls: [{ urlId: origin.urls[0]?.id }],
          content: body,
          tags: tags,
        };
        const res = await requestAuth.patch(`/prf-posts/${param.id}`, data);
        console.log(res);
        if (res.data.id) navigate("/");
      } else if (curCategory === "음악") {
        const data: IEditData = {
          title: title,
          category: curCategory,
          newUrls: [...urls.filter((x) => !x.id)],
          deletedUrls: origin.urls
            .filter((x: Iurls): boolean => {
              let result = true;
              for (let item of urls) {
                if (x.title === item.title) result = false;
              }
              return result;
            })
            .map((x: Iurls) => {
              return {
                urlId: x.id,
              };
            }),
          content: body,
          tags: tags,
        };
        const res = await requestAuth.patch(`/prf-posts/${param.id}`, data);
        console.log(res);
        if (res.data.id) navigate("/");
      } else {
        let Key: any;
        const data: IEditData = {
          title: title,
          category: curCategory,
          newUrls: [{ title: "", url: latLon.lat, thumbnail: latLon.lon }],
          deletedUrls: [{ urlId: origin.urls[0].id }],
          content: body,
          tags: tags,
        };
        if (file) {
          Key = await UpdateImg(file, origin.imageKey);
          data.imageKey = Key.fileKey;
        }
        const res = await requestAuth.patch(`/prf-posts/${param.id}`, data);
        console.log(res);
        if (res.data.id) navigate("/");
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
