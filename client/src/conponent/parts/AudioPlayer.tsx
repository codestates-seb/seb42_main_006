import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import IconBtn from "./IconButton";

const Container = styled.div`
  display: flex;
`;

const ImgContainer = styled.div`
  margin: 5px;
  width: 250px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  color: white;
  font-weight: bold;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const PlayBtn = styled.div`
  display: flex;
  width: 200px;
`;

type Props = {
  data: {
    url: string;
    thumbnail: string;
    title: string;
  };
};

const AudioPlayer: React.FC<Props> = ({ data }) => {
  const { url, thumbnail, title } = data;

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

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

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const playerRef = React.useRef<ReactPlayer>(null);

  return (
    <>
      <Container>
        <ImgContainer>
          <img src={thumbnail} alt={title} />
        </ImgContainer>
        <RightContainer>
          <Title>
            {title.slice(0, 20)} {title.length > 20 && "..."}
          </Title>
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
              handleClick={() => console.log("click")}
            />
            <button onClick={togglePlaying}>
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
                  handleClick={() => console.log("click")}
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
                  handleClick={() => console.log("click")}
                />
              )}
            </button>
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
              handleClick={() => console.log("click")}
            />
          </PlayBtn>

          <div>
            <label htmlFor="volume">Volume</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              id="volume"
            />
          </div>
          {isPlaying && (
            <ReactPlayer
              ref={playerRef}
              url={url}
              width="0"
              height="0"
              playing={isPlaying}
              volume={volume}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
          )}
          <div>
            <label htmlFor="seek">Seek</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={played}
              onChange={handleSeekChange}
              id="seek"
            />
            <div>
              {duration && (
                <span>
                  {new Date(duration * played * 1000)
                    .toISOString()
                    .substr(11, 8)}
                  {" / "}
                  {new Date(duration * 1000).toISOString().substr(11, 8)}
                </span>
              )}
            </div>
          </div>
        </RightContainer>
      </Container>
    </>
  );
};

export default AudioPlayer;
