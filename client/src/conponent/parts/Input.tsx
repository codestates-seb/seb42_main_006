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
  padding: 2px 8px;
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
        height="90%"
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
    <InputWrapper width={width} height={height}>
      <input type="text" placeholder={placeholder} />
    </InputWrapper>
  );
}

const ValidInputWrapper = styled(InputWrapper)`
  margin-bottom: 5px;

  & ~ span {
    color: red;
    padding-left: 10px;
  }
`;

interface ValidInputProp extends InputWrapperProp {
  placeholder: string;
  errorMsg: string;
  value: string;
  valid: boolean;
  type?: string;
  disable?: boolean;
  setValue: (x: string) => void;
  setValid: (x: boolean) => void;
  validFn: (x: string) => boolean;
}

export function ValidInput({
  width,
  height,
  placeholder,
  type,
  value,
  setValue,
  valid,
  setValid,
  errorMsg,
  validFn,
  disable,
}: ValidInputProp) {
  return (
    <div>
      <ValidInputWrapper width={width} height={height}>
        {disable === true ? (
          <input
            value={value}
            type={type || "text"}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            onBlur={() => setValid(validFn(value))}
            disabled
          />
        ) : (
          <input
            value={value}
            type={type || "text"}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            onBlur={() => setValid(validFn(value))}
          />
        )}
      </ValidInputWrapper>
      {!valid && <span>{errorMsg}</span>}
    </div>
  );
}
