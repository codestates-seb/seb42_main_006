import React, { useState } from "react";
import styled from "styled-components";
import IconBtn from "../conponent/parts/IconButton";
import Player from "../conponent/postDetail/music/Player";
import Slide from "../conponent/postDetail/restaurant/Slide";
import CommentCreator from "../conponent/CommentCreator";
import CommentList from "../conponent/parts/CommentList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 80%;
  min-width: 400px;
  max-width: 800px;
  margin: 24px auto;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
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
  width: 390px;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  height: 350px;
  margin-bottom: 5px;
`;

const ContentBox = styled(Boxs)`
  padding: 12px;
  overflow: hidden;
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
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  word-break: break-word;
  white-space: pre-wrap;
`;

const initialState = [
  {
    url: "https://www.youtube.com/watch?v=6iLczIQ83dg",
    thumbnail: "https://i.ytimg.com/vi/6iLczIQ83dg/mqdefault.jpg",
    title: "내가 너무 좋아하는 인디음악 playlist",
  },
  {
    url: "https://www.youtube.com/watch?v=tWL_s_IJMDQ",
    thumbnail: "https://i.ytimg.com/vi/tWL_s_IJMDQ/mqdefault.jpg",
    title: "𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁 내적 열정 끌어올려줄 신나는 팝송 플레이리스트🔥",
  },
  {
    url: "https://www.youtube.com/watch?v=5qH19rRJ7iw",
    thumbnail: "https://i.ytimg.com/vi/5qH19rRJ7iw/mqdefault.jpg",
    title: "[𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭] 요즘 듣는 잔잔한 새벽감성 음악 모음",
  },
  {
    url: "https://www.youtube.com/watch?v=Rrf8uQFvICE",
    thumbnail: "https://i.ytimg.com/vi/Rrf8uQFvICE/mqdefault.jpg",
    title: "NewJeans (뉴진스) 'Hype Boy' Official MV (MINJI ver.)",
  },
  {
    url: "https://www.youtube.com/watch?v=a5Q_iyci1nA",
    thumbnail: "https://i.ytimg.com/vi/a5Q_iyci1nA/mqdefault.jpg",
    title:
      "You'll change your mood, because you're in this song - The Very Best Of Soul - New Soul Music",
  },
];

export default function PostDetail() {
  const [list, setList] = useState(initialState);

  return (
    <Container>
      <TitleContainer>
        <Title>나만의 플레이리스트 공유합니다</Title>
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
          handleClick={() => console.log("click")}
        />
      </TitleContainer>
      <BoxContainer>
        <Boxs>
          <Player list={list} nowPlaying={list[0]} setList={setList}></Player>
          {/* <Slide
              url="https://i.ytimg.com/vi/Rrf8uQFvICE/mqdefault.jpg"
              loc={{ lat: "37.2819", lon: "127.14814" }}
            ></Slide> */}
        </Boxs>
        <ContentBox>
          <Spre></Spre>
        </ContentBox>
      </BoxContainer>
      <RetweetContainer>
        <CommentCreator></CommentCreator>
        <CommentList></CommentList>
      </RetweetContainer>
    </Container>
  );
}
