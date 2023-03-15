import React, { useRef, useCallback, useState } from "react";
import styled from "styled-components";

import { StyledBtn } from "./Button";
import { SearchIcon } from "../../icons/Icon";

interface InputWrapperProp {
  width: string;
}

const InputWrapper = styled.div<InputWrapperProp>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
  border: 2px solid #4a4a4a;
  border-radius: 4px;
  padding: 4px 8px;
  width: ${(props) => props.width};
  max-width: 900px;
  gap: 5px;

  &:focus-within {
    border-color: #ff3366;
  }

  > input {
    flex: 1 1 auto;
    outline: none;
    background-color: inherit;
    border: none;
    font-size: 1rem;

    color: white;
  }
`;

interface searchInputProp extends InputWrapperProp {
  placeholder: string;
}
export function SearchInput({ width, placeholder }: searchInputProp) {
  return (
    <InputWrapper width={width}>
      <input type="text" placeholder={placeholder} />
      <SearchIcon></SearchIcon>
    </InputWrapper>
  );
}

interface buttonInputProp extends InputWrapperProp {
  title: string;
  placeholder: string;
  handleClick: (x: string) => void;
  style?: React.CSSProperties;
}

export function ButtonInput({
  title,
  width,
  placeholder,
  handleClick,
  style,
}: buttonInputProp) {
  const [value, setValue] = useState("");
  return (
    <InputWrapper width={width} style={style}>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
      />
      <StyledBtn
        title={title}
        width="10%"
        height="90%"
        radius="4px"
        btnType="full"
        fontColor="white"
        fontWeight={400}
        handleClick={() => handleClick(value)}
      ></StyledBtn>
    </InputWrapper>
  );
}

interface DefaultInputProp extends InputWrapperProp {
  placeholder: string;
}

export function DefaultInput({ width, placeholder }: DefaultInputProp) {
  return (
    <InputWrapper width={width}>
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
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  validFn: (x: string) => boolean;
}

export function ValidInput({
  width,
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
      <ValidInputWrapper width={width}>
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

interface textAreaProp extends InputWrapperProp {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const StyledTextarea = styled(InputWrapper)`
  > textarea {
    background-color: transparent;
    color: #ffffff;
    overflow: hidden;
    outline: none;
    border: none;
    width: 100%;
    font-size: 1rem;
  }
`;

export function Textarea({
  width,
  value,
  setValue,
  placeholder,
}: textAreaProp) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, []);

  return (
    <StyledTextarea width={width}>
      <textarea
        ref={textAreaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={handleResizeHeight}
        rows={10}
      ></textarea>
    </StyledTextarea>
  );
}

interface TagInputProp extends InputWrapperProp {
  children: React.ReactNode;
  addTags: (x: string) => void;
  deleteTags: () => void;
}

export function TagInput({
  width,
  addTags,
  deleteTags,
  children,
}: TagInputProp) {
  const [value, setValue] = useState("");

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTags(value);
      setValue("");
    } else if (value.length === 0 && e.key === "Backspace") {
      e.preventDefault();
      deleteTags();
    }
  };

  return (
    <InputWrapper width={width}>
      {children}
      <input
        type="text"
        value={value}
        placeholder="Tags ..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onKeyUp={keyPressHandler}
      />
    </InputWrapper>
  );
}
