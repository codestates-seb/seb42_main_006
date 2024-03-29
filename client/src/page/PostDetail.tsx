import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconBtn from "../conponent/parts/IconButton";
import Player from "../conponent/postDetail/music/Player";
import Slide from "../conponent/postDetail/restaurant/Slide";
import YoutubePlayer from "../conponent/postDetail/movie/YoutubePlayer";
import CommentCreator from "../conponent/CommentCreator";
import CommentList from "../conponent/parts/CommentList";
import { requestAuth } from "../function/request";

import { IYoutubeInfo as Iurls } from "../util/PostApi";
import { useNavigate, useParams } from "react-router";
import Loading from "../conponent/parts/Loading";
import Tag from "../conponent/parts/Tag";
import { StyledBtn } from "../conponent/parts/Button";
import { likeBtnRequest, submitComment } from "../util/PostApi";
import { splitTag } from "../function/validFn";

interface IpostDetailData {
  id: number;
  memberId: number;
  memberName: string;
  title: string;
  category: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  tags: string;
  urls: Iurls[];
  comments: { commentId: number; content: string }[];
  imageKey: string;
  liked: boolean;
}

export default function PostDetail() {
  const [data, setData] = useState<IpostDetailData>();
  const [list, setList] = useState<Iurls[]>([]);

  const [reRender, setReRender] = useState({});
  const [showOption, setShowOption] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    requestAuth
      .get(`/prf-posts/${param.id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setList(res.data.urls);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //! 현제 좋아요된 글들은 삭제 불가
  const handleDelete = () => {
    requestAuth
      .delete(`/prf-posts/${param.id}`)
      .then((res) => {
        console.log(res.statusText);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = async () => {
    if (!!data) {
      try {
        const res = await likeBtnRequest(
          data.liked,
          `/like/prf-posts/${param.id}`,
        );
        res.status === 201
          ? setData({ ...data, liked: true })
          : setData({ ...data, liked: false });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (x: { content: string }) => {
    try {
      const res = await submitComment(`/prf-comments/${data?.id}`, x);
      if (res.status === 201) setReRender({});
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container>
      {data ? (
        <>
          <TitleContainer>
            <Title>{data.title}</Title>
            <TitleBtnWrapper>
              {showOption && (
                <>
                  <IconBtn
                    title=""
                    width="40px"
                    height="40px"
                    radius="5px"
                    fontWeight={400}
                    fontColor="red"
                    btnType=""
                    iconType="write"
                    border="none"
                    handleClick={() =>
                      navigate(`/addpost/edit/`, { state: data })
                    }
                  />
                  <IconBtn
                    title=""
                    width="40px"
                    height="40px"
                    radius="5px"
                    fontWeight={400}
                    fontColor="blue"
                    btnType=""
                    iconType="delete"
                    border="none"
                    handleClick={handleDelete}
                  />
                </>
              )}
              {JSON.parse(sessionStorage.getItem("user") as string).id ===
              data.memberId ? (
                <IconBtn
                  title=""
                  width="40px"
                  height="40px"
                  radius="5px"
                  fontWeight={400}
                  fontColor="pink"
                  btnType=""
                  iconType="treeDot"
                  border="none"
                  handleClick={() => setShowOption(!showOption)}
                />
              ) : (
                <>
                  <IconBtn
                    title=""
                    width="30px"
                    height="30px"
                    radius="5px"
                    fontWeight={400}
                    fontColor="#f36"
                    btnType=""
                    iconType={data?.liked ? "fullheart" : "heart"}
                    border="none"
                    handleClick={handleLike}
                  />
                  <StyledBtn
                    title="모집하기"
                    width="100px"
                    height="30px"
                    radius="50px"
                    fontWeight={400}
                    fontColor="pink"
                    btnType="empty"
                    handleClick={() =>
                      navigate(
                        `/collectpost/create/${param.id}?category=${data.category}`,
                      )
                    }
                  ></StyledBtn>
                </>
              )}
            </TitleBtnWrapper>
          </TitleContainer>
          <BoxContainer>
            <Boxs>
              {list.length > 0 && (
                <>
                  {data.category === "영화" && <YoutubePlayer item={list[0]} />}
                  {data.category === "음악" && list.length > 0 && (
                    <Player list={list} setList={setList}></Player>
                  )}
                  {data.category === "맛집" && (
                    <Slide
                      url={`${process.env.REACT_APP_S3_URL + data.imageKey}`}
                      loc={{ lat: list[0].url, lon: list[0].thumbnail }}
                    />
                  )}
                </>
              )}
            </Boxs>
            <ContentBox>
              <Spre>
                <Sspan>{data.memberName} </Sspan>
                {data.content}
              </Spre>
              <TagWrap>
                {splitTag(data.tags).map((x) => (
                  <Tag key={x}>{x}</Tag>
                ))}
              </TagWrap>
            </ContentBox>
          </BoxContainer>
          <RetweetContainer>
            <CommentCreator handleSubmit={handleSubmit}></CommentCreator>
            <CommentList
              postId={data.id}
              from="posts"
              reRender={reRender}
            ></CommentList>
          </RetweetContainer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

const TitleBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

const Sspan = styled.span`
  display: inline-block;
  font-weight: 700;
  padding-right: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 80%;
  min-width: 350px;
  max-width: 800px;
  margin: 24px auto;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Boxs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 48%;
  min-width: 350px;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  height: 350px;
  margin-bottom: 5px;

  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const ContentBox = styled(Boxs)`
  padding: 12px;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    height: 150px;
  }
`;

const RetweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  /* border: 1px solid #4a4a4a; */
  width: 100%;
`;

const Spre = styled.pre`
  width: 100%;
  height: 90%;
  overflow: auto;
  overflow-y: scroll;
  word-break: break-word;
  white-space: pre-wrap;
  font-size: 1rem;
`;

const TagWrap = styled.div`
  width: 100%;
  height: 10%;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 5px;
`;
