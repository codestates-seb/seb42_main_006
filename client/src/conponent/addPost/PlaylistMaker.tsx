import React from "react";
import styled from "styled-components";
import { ButtonInput } from "../parts/InputNoH";
import YoutubeList from "../postDetail/music/YoutubeList";

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
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

interface IplaylistMakerProp {
  onAddList: (x: string) => void;
  urls: Iurls[];
  setUrls: React.Dispatch<React.SetStateAction<Iurls[]>>;
}

function PlaylistMaker({ urls, setUrls, onAddList }: IplaylistMakerProp) {
  return (
    <>
      <InputTitle>플레이리스트</InputTitle>
      <ButtonInput
        title="Add list"
        width="100%"
        placeholder="Urls ..."
        handleClick={onAddList}
      ></ButtonInput>
      <PlaylistWrapper>
        <YoutubeList list={urls} setList={setUrls}></YoutubeList>
      </PlaylistWrapper>
    </>
  );
}

export default PlaylistMaker;