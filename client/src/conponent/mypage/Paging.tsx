import styled from "styled-components";
import { PrevIcon, NextIcon } from "../../icons/MyIcon";

const PagingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
`;

const PagingList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
`;

interface PagingActiveStyleProps {
  isActive: boolean;
}

const PagingBtn = styled.button<PagingActiveStyleProps>`
  color: ${(props) => (props.isActive ? "#ff3366" : "#3c3c3c")};
`;

const PagingLi = styled.li<PagingActiveStyleProps>`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid #5a5959;
  border-radius: 1000px;
  font-size: 0.85rem;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#ff3366" : null)};
  border-color: ${(props) => (props.isActive ? "#ff3366" : null)};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#ff3366" : "#3c3c3c")};
    border-color: ${(props) => (props.isActive ? "#ff3366" : "#3c3c3c")};
  }
`;

interface PagingLiProps {
  curr: number;
  total: number;
  arr: number[];
  handlePaging: (num: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function Paging({
  curr,
  arr,
  total,
  handlePaging,
  handlePrev,
  handleNext,
}: PagingLiProps) {
  return (
    <PagingBox>
      <PagingBtn
        isActive={curr === 1 ? false : true}
        onClick={curr === 1 ? undefined : handlePrev}
      >
        <PrevIcon />
      </PagingBtn>
      <PagingList>
        {arr.map((el) => (
          <PagingLi
            key={el}
            isActive={curr === el ? true : false}
            onClick={() => handlePaging(el)}
          >
            {el}
          </PagingLi>
        ))}
      </PagingList>
      <PagingBtn
        isActive={curr === total ? false : true}
        onClick={curr === total ? undefined : handleNext}
      >
        <NextIcon />
      </PagingBtn>
    </PagingBox>
  );
}
