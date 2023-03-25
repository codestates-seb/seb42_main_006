import React, { useState } from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import YoutubeList from "./YoutubeList";

import { IYoutubeInfo as Iurls } from "../../../util/PostApi";

interface PlayerProp {
  list: Iurls[];
  setList: React.Dispatch<React.SetStateAction<Iurls[]>>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222222;
  display: flex;
  flex-direction: column;
`;

function Player({ list, setList }: PlayerProp) {
  const [nowPlaying, setNowPlaying] = useState<Iurls>(list[0]);

  const onSelect = (x: Iurls) => {
    setNowPlaying(x);
  };

  return (
    <Wrapper>
      <AudioPlayer
        data={nowPlaying}
        list={list}
        setNowPlaying={setNowPlaying}
      ></AudioPlayer>
      <YoutubeList
        list={list}
        setList={setList}
        onSelect={onSelect}
        mode="read"
      ></YoutubeList>
    </Wrapper>
  );
}

export default Player;
