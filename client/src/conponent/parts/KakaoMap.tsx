import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
  const kakao: any;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface MapComponentProp {
  loc: string | { lat: string; lon: string };
  mode: "Search" | "Location";
}

function KakaoMap({ loc, mode }: MapComponentProp) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2819, 127.14814),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker();
    const places = new kakao.maps.services.Places();
    marker.setMap(map);
    places.setMap(map);

    if (mode === "Search") {
      const callback = function (
        result: { [key: string]: string }[],
        status: string,
      ) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);
          map.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
          marker.setPosition(new kakao.maps.LatLng(result[0].y, result[0].x));
        }
      };
      if (typeof loc === "string" && loc.length !== 0) {
        places.keywordSearch(loc, callback, { size: 1 });
      }
    } else {
      if (typeof loc === "object") {
        map.setCenter(new kakao.maps.LatLng(loc.lat, loc.lon));
        marker.setPosition(new kakao.maps.LatLng(loc.lat, loc.lon));
      }
    }
  });

  return <Wrapper id="map">KakaoMap</Wrapper>;
}

export default KakaoMap;
