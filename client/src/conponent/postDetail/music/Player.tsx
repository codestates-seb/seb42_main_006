import React from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import YoutubeList from "./YoutubeList";

import { Iurls } from "../../../page/AddPost";

interface PlayerProp {
  list: Iurls[];
  nowPlaying: Iurls;
  setList: React.Dispatch<React.SetStateAction<Iurls[]>>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222222;
  display: flex;
  flex-direction: column;
`;

function Player({ list, nowPlaying, setList }: PlayerProp) {
  return (
    <Wrapper>
      <AudioPlayer data={nowPlaying}></AudioPlayer>
      <YoutubeList list={list} setList={setList} mode="read"></YoutubeList>
    </Wrapper>
  );
}

export default Player;
