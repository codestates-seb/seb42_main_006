import {
  Heart,
  Write,
  Delete,
  TreeDot,
  Add,
  Retweet,
  LeftPlay,
  Play,
  RightPlay,
  NoneImg,
  DownArrow,
  LogOut,
  Calender,
  UserProfileImg,
} from "../../icons/Icon";
import styled from "styled-components";

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
`;

interface prop extends StyleProp {
  title: string;
  iconType: string;
  handleClick: () => any;
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
      default:
        return <Heart />;
    }
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
      onClick={handleClick}
      style={style}
    >
      {iconTypeHandler(iconType)} {title}
    </Button>
  );
}
