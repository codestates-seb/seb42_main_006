import KakaoMap from "./KakaoMap";
import styled, { css } from "styled-components";
import { DownArrow } from "../../../icons/Icon";
import { useState } from "react";
import defaultImg from "../../../icons/logo.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div<{ current: number }>`
  display: flex;
  width: 200%;
  height: 100%;
  position: absolute;
  top: 0;
  left: -${(props) => props.current * 100}%;
  transition: 0.3s ease-in-out;
`;
const ContentBox = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${defaultImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyleBtn = styled.button<{ arrow: string }>`
  position: absolute;
  top: calc(50% - 10px);
  ${(props) =>
    props.arrow === "90deg"
      ? css`
          left: 5px;
        `
      : css`
          right: 5px;
        `}
  width: 30px;
  height: 30px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  outline: none;
  border-radius: 100px;

  > svg {
    transform: rotate(${(props) => props.arrow});
    width: 30px;
    height: 30px;
    > path {
      fill: #f36;
    }
  }
`;

interface SlideProp {
  url: string;
  loc: { lat: string; lon: string };
}

function Slide({ url, loc }: SlideProp) {
  const [curSlide, setCurSlide] = useState<0 | 1>(0);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <Wrapper>
      <ContentWrapper current={curSlide}>
        <ContentBox>
          <img src={url} alt="user_image" onError={handleImgError} />
        </ContentBox>
        <ContentBox>
          <KakaoMap loc={loc} mode="Location"></KakaoMap>
        </ContentBox>
      </ContentWrapper>
      <StyleBtn arrow="90deg" onClick={() => setCurSlide(0)}>
        <DownArrow></DownArrow>
      </StyleBtn>

      <StyleBtn arrow="-90deg" onClick={() => setCurSlide(1)}>
        <DownArrow></DownArrow>
      </StyleBtn>
    </Wrapper>
  );
}

export default Slide;
