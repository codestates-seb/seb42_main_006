import React from "react";
import styled, { css } from "styled-components";

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
  transition: 0.3s ease-in-out;
  font-size: 1rem;

  &:hover {
    border-color: #ff7799;
    ${(props) =>
      props.btnType === "full"
        ? css`
            background-color: #ff7799;
          `
        : css`
            color: #ff7799;
          `}
  }
`;

interface prop extends StyleProp {
  title: string;
  handleClick: () => void;
  style?: React.CSSProperties;
  className?: any;
  disabled?: any;
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
  style,
  className,
  disabled,
}: prop) {
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
      onClick={handler}
      style={style}
      className={className}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
