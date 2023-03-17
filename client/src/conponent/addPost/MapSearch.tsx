import { useState } from "react";
import styled from "styled-components";
import { ButtonInput } from "../parts/InputNoH";
import KakaoMap from "../postDetail/restaurant/KakaoMap";

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

const InputTitle = styled.span`
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
`;

interface ImapSearchProp {
  setLatLon: React.Dispatch<React.SetStateAction<{ lat: string; lon: string }>>;
}

function MapSearch({ setLatLon }: ImapSearchProp) {
  const [loc, setLoc] = useState("");

  return (
    <>
      <InputTitle>위치</InputTitle>
      <Wrapper>
        <ButtonInput
          width="100%"
          title="검색"
          placeholder="장소명"
          handleClick={(value: string) => setLoc(value)}
        ></ButtonInput>
        <MapDiv>
          <KakaoMap loc={loc} mode="Search" setLatLon={setLatLon}></KakaoMap>
        </MapDiv>
      </Wrapper>
    </>
  );
}

export default MapSearch;
