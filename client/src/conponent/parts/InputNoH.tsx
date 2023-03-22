import React, { useRef, useCallback, useState, SetStateAction } from "react";
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
  border: 2px solid #5a5959;
  border-radius: 4px;
  padding: 4px 8px;
  width: ${(props) => props.width};
  max-width: 900px;
  gap: 5px;
  flex-wrap: wrap;

  &:focus-within {
    background-color: transparent;
    border-color: #ff3366;
  }
`;

const SInput = styled.input`
  flex: 1 1 auto;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 1rem;

  color: white;

  &[type="file"] {
    display: none;
  }
`;

const SLabel = styled.label`
  padding: 2px 8px;
  background-color: #ff3366;
  color: white;
  font-weight: 400;
  border-radius: 3px;
`;

interface searchInputProp extends InputWrapperProp {
  placeholder: string;
  className?: any;
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}
export function SearchInput({
  width,
  placeholder,
  value,
  setValue,
  className,
}: searchInputProp) {
  return (
    <InputWrapper width={width} className={className}>
      <SInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
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
      <SInput
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
      />
      <StyledBtn
        title={title}
        width=""
        height="90%"
        radius="4px"
        btnType="full"
        fontColor="white"
        fontWeight={400}
        style={{ padding: "0 8px" }}
        handleClick={() => {
          handleClick(value);
          setValue("");
        }}
      ></StyledBtn>
    </InputWrapper>
  );
}

interface DefaultInputProp extends InputWrapperProp {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DefaultInput({
  width,
  placeholder,
  value,
  setValue,
  onBlur,
}: DefaultInputProp) {
  return (
    <InputWrapper width={width}>
      <SInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onBlur={() => onBlur && onBlur(true)}
      />
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
        <SInput
          value={value}
          type={type || "text"}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onBlur={() => setValid(validFn(value))}
          disabled={!!disable}
        />
      </ValidInputWrapper>
      {!valid && <span>{errorMsg}</span>}
    </div>
  );
}

interface textAreaProp extends InputWrapperProp {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  row: number;
  placeholder: string;
}

const StyledTextarea = styled.textarea`
  background-color: transparent;
  color: #ffffff;
  overflow: hidden;
  outline: none;
  border: none;
  width: 100%;
  font-size: 1rem;
  resize: vertical;
`;

export function Textarea({
  width,
  value,
  setValue,
  placeholder,
  row,
}: textAreaProp) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, []);

  return (
    <InputWrapper width={width}>
      <StyledTextarea
        ref={textAreaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={handleResizeHeight}
        rows={row}
      ></StyledTextarea>
    </InputWrapper>
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
    if (value.length !== 0 && e.key === "#") {
      console.log(e.currentTarget.value);
      e.preventDefault();
      addTags(e.currentTarget.value);
      setValue("");
    } else if (value.length === 0 && e.key === "Backspace") {
      e.preventDefault();
      deleteTags();
    }
  };

  return (
    <InputWrapper width={width}>
      {children}
      <SInput
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

interface FileInputProp extends InputWrapperProp {
  value: File | undefined;
  setValue: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export function FileInput({ width, value, setValue }: FileInputProp) {
  const [filename, setFilename] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    } else {
      setFilename(files.name);
      setValue(files);
    }
  };
  return (
    <InputWrapper width={width}>
      <SLabel htmlFor="SInput-file">업로드하기</SLabel>
      <SInput
        type="text"
        placeholder={value ? filename : "사진을 업로드해주세요"}
        disabled
      />
      <SInput id="SInput-file" type="file" onChange={handleFileChange} />
    </InputWrapper>
  );
}
