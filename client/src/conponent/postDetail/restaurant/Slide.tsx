import KakaoMap from "./KakaoMap";
import styled, { css } from "styled-components";
import { DownArrow } from "../../../icons/Icon";
import { useState } from "react";

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
          left: 0;
        `
      : css`
          right: 0;
        `}
  width: max-content;
  z-index: 1000;
  background-color: transparent;
  border: none;
  outline: none;

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

  return (
    <Wrapper>
      <ContentWrapper current={curSlide}>
        <ContentBox>
          <img src={url} alt="user_image" />
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
