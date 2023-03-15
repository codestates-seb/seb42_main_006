import styled from "styled-components";
import { MovieIcon, MusicIcon, FoodIcon } from "../../icons/MainIcon";
import { FlowerIcon, RobotIcon, ShareIcon } from "../../icons/MainIcon";
import { MatchIcon, RecomIcon } from "../../icons/MainIcon";

interface StyleProps {
  border?: boolean;
}

const MainCateItem = styled.div<StyleProps>`
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

interface Props extends StyleProps {
  iconType: string;
  label?: string;
}

export default function MainCategory({ iconType, border, label }: Props) {
  const iconTypeHandler = (iconType: string) => {
    switch (iconType) {
      case "movie":
        return <MovieIcon width="3.5rem" height="3.5rem" />;
      case "music":
        return <MusicIcon width="3.5rem" height="3.5rem" />;
      case "food":
        return <FoodIcon width="3.5rem" height="3.5rem" />;
      case "flower":
        return <FlowerIcon width="3.5rem" height="3.5rem" />;
      case "robot":
        return <RobotIcon width="3.5rem" height="3.5rem" />;
      case "share":
        return <ShareIcon width="3.5rem" height="3.5rem" />;
      case "match":
        return <MatchIcon width="3.5rem" height="3.5rem" />;
      case "recommend":
        return <RecomIcon width="3.5rem" height="3.5rem" />;
    }
  };

  return (
    <>
      <MainCateItem border={border}>{iconTypeHandler(iconType)}</MainCateItem>
      <MainLabel>{label}</MainLabel>
    </>
  );
}
