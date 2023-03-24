import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import IconBtn from "../../parts/IconButton";
import { keyframes } from "styled-components";
import { Iurls } from "../../../page/AddPost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #222222;
  padding-top: 10px;

  height: 100px;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 20px);
`;

type ImgContainerProp = {
  rotate: boolean;
};

const ImgContainer = styled.div<ImgContainerProp>`
  margin: 5px;
  width: 70px;
  min-width: 70px;
  height: 70px;
  border-radius: 1000px;
  border: 2px solid #5a5959;
  overflow: hidden;
  animation: ${(props) => (props.rotate ? "roti 5s linear infinite" : "none")};

  @keyframes roti {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const marquee = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(-225%);
  }
`;

const TitleWrapper = styled.div`
  color: white;
  font-weight: bold;
  font-size: 13px;
  overflow: hidden;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  white-space: nowrap;
  animation: ${marquee} 15s linear infinite;
  text-overflow: ellipsis;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const PlayBtn = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 150px;
  align-items: center;
  justify-content: center;
`;

const PlayerWrapper = styled.div`
  display: none;
`;

const AudioInput = styled.input`
  z-index: 500;
  margin: 0;
  &[type="range"] {
    overflow: hidden;
    height: 4px;
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  &[type="range"]:focus {
    outline: none;
  }

  &[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 1000px;
    overflow: hidden;
    background-color: #5a5959;
    /* border: 1px solid #ff3366; */
  }

  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.5px;
    height: 0.5px;
    background: #ff3366;
    box-shadow: 1px 1px 50000px #d16a6e;
    cursor: pointer;
    box-shadow: -100vw 0 0 100vw #ff3366;
  }
`;

const AudioWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  min-width: 150px;
  margin-right: 10px;
`;

type Props = {
  data: Iurls;
  list: Iurls[];
  setNowPlaying: React.Dispatch<React.SetStateAction<Iurls>>;
};

const AudioPlayer: React.FC<Props> = ({ data, list, setNowPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  // const [duration, setDuration] = useState(0);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setPlayed(state.played);
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(event.target.value);
    setPlayed(seekTo);
    playerRef.current?.seekTo(seekTo);
  };

  const onEnd = () => {
    list.forEach((x, idx) => {
      if (x.id === data.id) {
        setNowPlaying(list[idx + 1]);
      }
    });
  };

  const controlSong = (arrow: 1 | -1) => {
    list.forEach((x, idx) => {
      if (x.id === data.id) {
        setNowPlaying(list[idx + Number(arrow)]);
      }
    });
  };

  // const handleDuration = (duration: number) => {
  //   setDuration(duration);
  // };

  const playerRef = React.useRef<ReactPlayer>(null);

  return (
    <>
      <Container>
        <TopWrapper>
          <ImgContainer rotate={isPlaying}>
            <ThumbnailImg src={data.thumbnail} alt={data.title} />
          </ImgContainer>
          <RightContainer>
            <TitleWrapper>
              <Title>{data.title}</Title>
            </TitleWrapper>
            <PlayBtn>
              <IconBtn
                title=""
                width="40px"
                height="40px"
                radius="5px"
                fontWeight={400}
                fontColor=""
                btnType=""
                iconType="leftPlay"
                border="none"
                handleClick={() => controlSong(-1)}
              />
              {isPlaying ? (
                <IconBtn
                  title=""
                  width="40px"
                  height="40px"
                  radius="5px"
                  fontWeight={400}
                  fontColor=""
                  btnType=""
                  iconType="stop"
                  border="none"
                  handleClick={() => setIsPlaying(false)}
                />
              ) : (
                <IconBtn
                  title=""
                  width="40px"
                  height="40px"
                  radius="5px"
                  fontWeight={400}
                  fontColor=""
                  btnType=""
                  iconType="play"
                  border="none"
                  handleClick={() => setIsPlaying(true)}
                />
              )}
              <IconBtn
                title=""
                width="40px"
                height="40px"
                radius="5px"
                fontWeight={400}
                fontColor=""
                btnType=""
                iconType="rightPlay"
                border="none"
                handleClick={() => controlSong(1)}
              />
            </PlayBtn>

            <AudioWrapper>
              <label htmlFor="volume">
                <IconBtn
                  title=""
                  width="30px"
                  height="30px"
                  radius="100px"
                  fontWeight={400}
                  fontColor=""
                  btnType=""
                  iconType="speaker"
                  border="none"
                  handleClick={() => console.log("click")}
                />
              </label>
              <AudioInput
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                id="volume"
              />
            </AudioWrapper>
          </RightContainer>
          <PlayerWrapper>
            <ReactPlayer
              ref={playerRef}
              url={data.url}
              playing={isPlaying}
              volume={volume}
              onProgress={handleProgress}
              onEnded={onEnd}
              // onDuration={handleDuration}
            />
          </PlayerWrapper>
        </TopWrapper>
        <label htmlFor="seek"></label>
        {/* <SeekWrapper> */}
        <AudioInput
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={played}
          onChange={handleSeekChange}
          id="seek"
        />
        {/* <div>
              {duration && (
                <span>
                  {new Date(duration * played * 1000)
                    .toISOString()
                    .substr(11, 8)}
                  {" / "}
                  {new Date(duration * 1000).toISOString().substr(11, 8)}
                </span>
              )}
            </div> */}
        {/* </SeekWrapper> */}
      </Container>
    </>
  );
};

export default AudioPlayer;
