import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { Iurls } from "./YoutubeList";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 14px;
  border: 2px solid #5a5959;
  background-color: #222222;
  border-radius: 5px;
  > div {
    border-radius: 10px;
    border: 2px solid #5a5959;
    overflow: hidden;
  }
`;

interface YoutubePlayerProp {
  item: Iurls;
}

function YoutubePlayer({ item }: YoutubePlayerProp) {
  return (
    <Wrapper>
      <div>
        <ReactPlayer url={item.url}></ReactPlayer>
      </div>
    </Wrapper>
  );
}

export default YoutubePlayer;
