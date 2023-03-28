import React from "react";
import styled from "styled-components";
import { ButtonInput } from "../parts/InputNoH";
import YoutubePlayer from "../postDetail/movie/YoutubePlayer";

interface Iurls {
  url: string;
  thumbnail: string;
  title: string;
}

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.3rem;
`;

interface IMoviePreviewProp {
  handleAddUrls: (x: string) => void;
  urls: Iurls[];
}

function MoviePreview({ handleAddUrls, urls }: IMoviePreviewProp) {
  return (
    <>
      <InputTitle>영화 Urls※</InputTitle>
      <ButtonInput
        title="Add list"
        width="100%"
        placeholder="Urls"
        handleClick={handleAddUrls}
      ></ButtonInput>
      {urls.length !== 0 && <YoutubePlayer item={urls[0]} />}
    </>
  );
}

export default MoviePreview;
