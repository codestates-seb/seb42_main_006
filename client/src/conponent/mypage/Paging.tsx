import { useState } from "react";
import styled from "styled-components";
import { PrevIcon, NextIcon } from "../../icons/MyIcon";

const PagingBox = styled.div`
  display: flex;
  margin-left: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  button {
    color: #3c3c3c;
  }
  button.active {
    color: #ff3366;
  }
`;

const PagingList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
`;
interface PagingLiStyleProps {
  isActive: boolean;
}

const PagingLi = styled.li<PagingLiStyleProps>`
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
  limit: number;
  total: number;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Paging({
  limit,
  total = 1,
  url,
  setUrl,
}: PagingLiProps) {
  const [arr, setArr] = useState(
    Array.from(
      { length: limit > total ? total : limit },
      (_, index) => index + 1
    )
  );
  const [curr, setCurr] = useState(1);

  const handlePaging = (num: number) => {
    setCurr(num);
    setUrl(`${url}&page=${num}`);
  };

  const handlePrev = () => {
    if (curr <= arr[0]) {
      let newArr;
      if (arr.length < limit) {
        newArr = Array.from(
          { length: limit },
          (_, index) => arr[0] - (limit - index)
        );
      } else {
        newArr = arr.map((el) => el - arr.length);
      }
      setArr(newArr);
      handlePaging(newArr[newArr.length - 1]);
    } else {
      handlePaging(curr - 1);
    }
  };

  const handleNext = () => {
    if (curr >= arr[arr.length - 1]) {
      const newArr = arr.map((el) => el + arr.length);
      if (newArr[newArr.length - 1] > total) {
        setArr(newArr.slice(0, newArr.indexOf(total + 1)));
      } else {
        setArr(newArr);
      }
      handlePaging(newArr[0]);
    } else {
      handlePaging(curr + 1);
    }
  };

  return (
    <PagingBox>
      <button
        className={curr === 1 ? undefined : "active"}
        onClick={curr === 1 ? undefined : handlePrev}
      >
        <PrevIcon />
      </button>
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
      <button
        className={curr === total ? undefined : "active"}
        onClick={curr === total ? undefined : handleNext}
      >
        <NextIcon />
      </button>
    </PagingBox>
  );
}
