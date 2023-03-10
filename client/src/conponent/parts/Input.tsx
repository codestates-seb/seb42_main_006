import styled from "styled-components";

import { StyledBtn } from "./Button";
import { SearchIcon } from "../../icons/Icon";

interface InputWrapperProp {
  width: string;
  height: string;
}

const InputWrapper = styled.div<InputWrapperProp>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
  border: 2px solid #4a4a4a;
  border-radius: 4px;
  padding: 0 8px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 900px;

  &:focus-within {
    border-color: #ff3366;
  }

  > input {
    flex: 1 1 auto;
    outline: none;
    background-color: inherit;
    border: none;

    color: white;
  }
`;

interface searchInputProp extends InputWrapperProp {
  placeholder: string;
}
export function SearchInput({ width, height, placeholder }: searchInputProp) {
  return (
    <InputWrapper width={width} height={height}>
      <input type="text" placeholder={placeholder} />
      <SearchIcon></SearchIcon>
    </InputWrapper>
  );
}

interface buttonInputProp extends InputWrapperProp {
  title: string;
  placeholder: string;
  handleClick: () => void;
  style?: React.CSSProperties;
}

export function ButtonInput({
  title,
  width,
  height,
  placeholder,
  handleClick,
  style,
}: buttonInputProp) {
  return (
    <InputWrapper width={width} height={height} style={style}>
      <input type="text" placeholder={placeholder} />
      <StyledBtn
        title={title}
        width="10%"
        height=""
        radius="4px"
        btnType="full"
        fontColor="white"
        fontWeight={300}
        handleClick={handleClick}
      ></StyledBtn>
    </InputWrapper>
  );
}

interface DefaultInputProp extends InputWrapperProp {
  placeholder: string;
}

export function DefaultInput({ width, height, placeholder }: DefaultInputProp) {
  return (
    <InputWrapper width={width} height={height} placeholder={placeholder}>
      <input type="text" placeholder={placeholder} />
    </InputWrapper>
  );
}
