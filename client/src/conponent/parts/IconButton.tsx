import {
  Heart,
  FullHeart,
  Write,
  Delete,
  TreeDot,
  Add,
  Retweet,
  LeftPlay,
  Play,
  Stop,
  RightPlay,
  NoneImg,
  DownArrow,
  LogOut,
  Calender,
  UserProfileImg,
  Speaker,
} from "../../icons/Icon";
import styled from "styled-components";
import React from "react";

interface StyleProp {
  width: string;
  height: string;
  radius: string;
  fontWeight: number;
  fontColor: string;
  btnType: string;
  border?: string;
}

const Button = styled.button<StyleProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.radius};
  font-weight: ${(props) => props.fontWeight};
  background-color: ${(props) =>
    props.btnType === "full" ? "#ff3366" : "transparent"};
  color: ${(props) => (props.fontColor === "pink" ? "#ff3366" : "#ffffff")};
  border: ${(props) => props.border || "2px solid #ff3366"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

interface prop extends StyleProp {
  title: string;
  iconType: string;
  handleClick: () => void;
  style?: React.CSSProperties;
}

export default function IconBtn({
  iconType,
  title,
  width,
  height,
  radius,
  fontWeight,
  fontColor,
  btnType,
  border,
  handleClick,
  style,
}: prop) {
  const iconTypeHandler = (iconType: string) => {
    switch (iconType) {
      case "heart":
        return <Heart />;
      case "fullheart":
        return <FullHeart />;
      case "write":
        return <Write />;
      case "delete":
        return <Delete />;
      case "treeDot":
        return <TreeDot />;
      case "add":
        return <Add />;
      case "retweet":
        return <Retweet />;
      case "leftPlay":
        return <LeftPlay />;
      case "play":
        return <Play />;
      case "stop":
        return <Stop />;
      case "rightPlay":
        return <RightPlay />;
      case "noneImg":
        return <NoneImg />;
      case "downArrow":
        return <DownArrow />;
      case "logOut":
        return <LogOut />;
      case "calender":
        return <Calender />;
      case "profile":
        return <UserProfileImg />;
      case "speaker":
        return <Speaker />;
      default:
        return <Heart />;
    }
  };
  const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <Button
      width={width}
      height={height}
      radius={radius}
      fontWeight={fontWeight}
      fontColor={fontColor}
      btnType={btnType}
      border={border}
      onClick={handler}
      style={style}
    >
      {iconTypeHandler(iconType)} {title}
    </Button>
  );
}
