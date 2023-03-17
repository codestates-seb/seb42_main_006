import styled from "styled-components";
import { MovieIcon, MusicIcon, FoodIcon } from "../../icons/MainIcon";
import { FlowerIcon, RobotIcon, ShareIcon } from "../../icons/MainIcon";
import { MatchIcon, RecomIcon } from "../../icons/MainIcon";

interface MainCateStyleProps {
  border?: boolean;
}

const MainCateItem = styled.div<MainCateStyleProps>`
  display: flex;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${(props) => (props.border ? "initial" : "#222")};
  border: ${(props) => (props.border ? "3px solid #ff3366" : "initial")};
  border-radius: 1000px;
`;

const MainLabel = styled.strong`
  display: block;
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

interface MainCateProps extends MainCateStyleProps {
  iconType: string;
  label?: string;
}

type IconText =
  | "movie"
  | "music"
  | "food"
  | "flower"
  | "robot"
  | "share"
  | "match"
  | "recommend";

export default function MainCategory({
  iconType,
  border,
  label,
}: MainCateProps) {
  const iconTypeHandler = (iconType: IconText) => {
    switch (iconType) {
      case "movie":
        return <MovieIcon />;
      case "music":
        return <MusicIcon />;
      case "food":
        return <FoodIcon />;
      case "flower":
        return <FlowerIcon />;
      case "robot":
        return <RobotIcon />;
      case "share":
        return <ShareIcon />;
      case "match":
        return <MatchIcon />;
      case "recommend":
        return <RecomIcon />;
      default:
        return <MovieIcon />;
    }
  };

  let symbol: any = "";
  symbol = iconType;

  return (
    <>
      <MainCateItem border={border}>{iconTypeHandler(symbol)}</MainCateItem>
      <MainLabel>{label}</MainLabel>
    </>
  );
}
