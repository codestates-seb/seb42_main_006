import styled from "styled-components";

interface StyleProp {
  width: string;
  height: string;
  radius: string;
  fontWeight: number;
  fontColor: string;
  btnType: string;
}

const Button = styled.button<StyleProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.radius};
  font-weight: ${(props) => props.fontWeight};
  background-color: ${(props) =>
    props.btnType === "full" ? "#ff3366" : "transparent"};
  color: ${(props) => (props.fontColor === "pink" ? "#ff3366" : "#ffffff")};
  border: 2px solid #ff3366;
`;

interface prop extends StyleProp {
  title: string;
  handleClick: () => any;
}

export function StyledBtn({
  title,
  width,
  height,
  radius,
  fontWeight,
  fontColor,
  btnType,
  handleClick,
}: prop) {
  return (
    <Button
      width={width}
      height={height}
      radius={radius}
      fontWeight={fontWeight}
      fontColor={fontColor}
      btnType={btnType}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
}
