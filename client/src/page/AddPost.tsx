import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import MoviePreview from '../conponent/addPost/MoviePreview';
import PlaylistMaker from '../conponent/addPost/PlaylistMaker';
import Selection from '../conponent/parts/Selection';
import MapSearch from '../conponent/addPost/MapSearch';
import { DefaultInput, Textarea, FileInput } from '../conponent/parts/InputNoH';
import { StyledBtn } from '../conponent/parts/Button';
import { requestAuth } from '../function/request';
import { submitUrl, UpdateImg, UploadImg, createPatchData } from '../util/PostApi';
import { getVideoId } from '../function/youtubeApi';
import { validFn } from '../function/validFn';
import { IYoutubeInfo as Iurls, IPostSubmitData as Idata } from '../util/PostApi';
import useModal from '../conponent/Modal/useModal';

export default function AddPost() {
  const [origin, setOrigin] = useState<any>(null);
  const [file, setfile] = useState<File>();
  const [imageKey, setImageKey] = useState<string>();
  const [latLon, setLatLon] = useState<{ lat: string; lon: string }>({
    lat: '37.49652290597856',
    lon: '127.02479374965135',
  });
  const [post, setPost] = useState<Idata>({
    category: '',
    content: '',
    tags: '',
    title: '',
    urls: [],
  });

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const modal = useModal();
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (param.mode === 'edit') {
      setOrigin(location.state);
      setPost(location.state);
      setLatLon({
        lat: location.state.urls[0].url,
        lon: location.state.urls[0].thumbnail,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //이미지 바뀌면 이미지 업로드하고 키 받아옴
  useEffect(() => {
    if (file) {
      modal({ type: 'uploadImg' });
      if (param.mode === 'create') {
        UploadImg(file)
          .then((res) => {
            modal({ type: 'default' });
            setImageKey(res.fileKey);
          })
          .catch((err) => {
            modal({ type: 'uploadImgFail' });
          });
      } else {
        UpdateImg(file, origin.imageKey)
          .then((res) => {
            modal({ type: 'default' });
            setImageKey(res.fileKey);
          })
          .catch((err) => {
            modal({ type: 'uploadImgFail' });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  //urlr관련 함수들(삭제, 추가, 순서바꾸기)
  const handleDelUrls = (item: string) => {
    setPost((prev) => ({ ...prev, urls: [...prev.urls.filter((x) => x.url !== item)] }));
  };

  const handleAddUrls = (youtubeUrl: string) => {
    if (!validFn('youtubeUrl')(youtubeUrl)) {
      alert('Youtube Url만 이용 가능합니다.');
      return;
    }

    if (post.urls.filter((x) => x.url === youtubeUrl).length !== 0) {
      alert('중복된 Url은 등록하실 수 없습니다.');
      return;
    }

    const url: Iurls = { url: '', thumbnail: '', title: '' };

    getVideoId(youtubeUrl)
      .then((res) => {
        url.url = youtubeUrl;
        url.thumbnail = res.items[0].snippet.thumbnails.default.url;
        url.title = res.items[0].snippet.title;
      })
      .then(() => setPost((prev) => ({ ...prev, urls: [url, ...prev.urls] })))
      .catch((err) => console.log(err));
  };

  const handleChangeUrlList = (list: Iurls[]) => {
    setPost((prev) => ({ ...prev, urls: [...list] }));
  };

  //post 요청 관련
  const isValid = () => {
    return post.title.length > 0 && post.category.length > 0 && post.content.length > 0 && post.tags.length > 0;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      if (param.mode === 'create') {
        const data: Idata = {
          ...post,
          urls: submitUrl('create', post.category, post.urls, latLon),
          tags: post.tags[0] !== '#' ? `#${post.tags}` : post.tags,
        };
        if (imageKey) data.imageKey = imageKey;
        try {
          const res = await requestAuth.post('/prf-posts', data);
          if (res.data.id) navigate(`/postdetail/${res.data.id}`);
        } catch (err) {
          modal({ type: 'submitFail' });
        }
      } else if (param.mode === 'edit') {
        const [newUrl, delUrl] = submitUrl('edit', post.category, post.urls, latLon, origin);
        const data = createPatchData(origin, post);
        newUrl && (data.newUrls = newUrl);
        delUrl && (data.deletedUrls = delUrl);
        if (imageKey) data.imageKey = imageKey;
        try {
          console.log(data);
          const res = await requestAuth.patch(`/prf-posts/${location.state.id}`, data);
          if (res.data.id) navigate(`/postdetail/${res.data.id}`);
        } catch (err) {
          modal({ type: 'submitFail' });
        }
      }
    } else {
      modal({ type: 'submitFail' });
    }
  };

  return (
    <Background>
      <Category>
        <Title>게시글 작성하기</Title>
        <CategoryWrapper>
          <CategoryTitle>카테고리※ </CategoryTitle>
          <Selection
            width=""
            name="category"
            value={post.category}
            opt={['영화', '음악', '맛집']}
            onChange={handlePostChange}
          ></Selection>
        </CategoryWrapper>
      </Category>
      <FormWrapper>
        <InputTitle>제목※</InputTitle>
        <DefaultInput
          width="100%"
          placeholder="제목"
          name="title"
          value={post.title}
          onChange={handlePostChange}
        ></DefaultInput>

        {post.category === '영화' && <MoviePreview urls={post.urls} handleAddUrls={handleAddUrls} />}
        {post.category === '음악' && (
          <PlaylistMaker
            urls={post.urls}
            setUrls={handleChangeUrlList}
            onAddList={handleAddUrls}
            onDelList={handleDelUrls}
          />
        )}
        {post.category === '맛집' && (
          <>
            <MapSearch latLon={latLon} setLatLon={setLatLon} />
            <InputTitle>사진※</InputTitle>
            <FileInput width="100%" value={file} setValue={setfile}></FileInput>
          </>
        )}

        <InputTitle>내용※</InputTitle>
        <Textarea
          width="100%"
          name="content"
          value={post.content}
          onChange={handlePostChange}
          placeholder="내용을 입력해주세요."
          row={10}
        ></Textarea>
        <InputTitle>태그※</InputTitle>
        <DefaultInput
          width="100%"
          name="tags"
          value={post.tags}
          onChange={handlePostChange}
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
  font-size: 1.3rem;
`;

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.3rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
