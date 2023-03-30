import React from "react";
import styled from "styled-components";
import { ButtonInput } from "../parts/InputNoH";
import YoutubeList from "../postDetail/music/YoutubeList";
import { IYoutubeInfo as Iurls } from "../../util/PostApi";

interface IplaylistMakerProp {
  onAddList: (x: string) => void;
  urls: Iurls[];
  setUrls: React.Dispatch<React.SetStateAction<Iurls[]>>;
  onDelList: (x: string) => void;
}

function PlaylistMaker({
  urls,
  setUrls,
  onAddList,
  onDelList,
}: IplaylistMakerProp) {
  return (
    <>
      <InputTitle>플레이리스트※</InputTitle>
      <ButtonInput
        title="Add list"
        width="100%"
        placeholder="Urls ..."
        handleClick={onAddList}
      ></ButtonInput>
      {urls.length !== 0 && (
        <PlaylistWrapper>
          <YoutubeList
            list={urls}
            setList={setUrls}
            mode="edit"
            onDelete={onDelList}
          ></YoutubeList>
        </PlaylistWrapper>
      )}
    </>
  );
}

export default PlaylistMaker;

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.3rem;
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
