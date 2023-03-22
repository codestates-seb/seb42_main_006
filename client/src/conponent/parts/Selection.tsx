import styled from "styled-components";

interface styledSelectProp {
  width: string;
}

const StyledSelect = styled.select<styledSelectProp>`
  background-color: #282828;
  border: 2px solid #4a4a4a;
  border-radius: 4px;
  padding: 4px 8px;
  width: ${(props) => props.width};
  outline: none;
  font-size: 1rem;
  color: #ffffff;
`;

interface selectionProp extends styledSelectProp {
  value?: string;
  opt: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

function Selection({ value, width, opt, setCategory }: selectionProp) {
  return (
    <StyledSelect
      value={value}
      width={width}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setCategory(e.target.value)
      }
    >
      <option value="" disabled hidden>
        선택해주세요.
      </option>
      {opt.map((x) => {
        return (
          <option value={x} key={x}>
            {x}
          </option>
        );
      })}
    </StyledSelect>
  );
}

export default Selection;
