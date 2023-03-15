import { useState } from "react";
import styled from "styled-components";
import { ButtonInput } from "./parts/InputNoH";
import KakaoMap from "./parts/KakaoMap";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282828;
  border: 2px solid #4a4a4a;
  border-radius: 4px;
  padding: 1rem;
  gap: 10px;
`;

const MapDiv = styled.div`
  width: 60%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a4a4a;
  min-width: 300px;
`;

function MapSearch() {
  const [loc, setLoc] = useState("");

  return (
    <Wrapper>
      <ButtonInput
        width="100%"
        title="검색"
        placeholder="장소명"
        handleClick={(value: string) => setLoc(value)}
      ></ButtonInput>
      <MapDiv>
        <KakaoMap loc={loc} mode="Search"></KakaoMap>
      </MapDiv>
    </Wrapper>
  );
}

export default MapSearch;
