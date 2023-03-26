import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { IYoutubeInfo as Iurls } from "../../../util/PostApi";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 14px;
  /* border: 2px solid #5a5959;
  background-color: #222222; */
  border-radius: 5px;
  > div {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    border: 2px solid #5a5959;
    overflow: hidden;
    position: relative;

    .react-player {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

interface YoutubePlayerProp {
  item: Iurls;
}

function YoutubePlayer({ item }: YoutubePlayerProp) {
  return (
    <Wrapper>
      <div>
        <ReactPlayer
          url={item.url}
          width="100%"
          height="100%"
          controls={true}
        ></ReactPlayer>
      </div>
    </Wrapper>
  );
}

export default YoutubePlayer;
