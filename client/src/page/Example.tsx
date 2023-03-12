import { StyledBtn } from "../conponent/parts/Button";
import {
  SearchInput,
  ButtonInput,
  DefaultInput,
} from "../conponent/parts/Input";
import IconBtn from "../conponent/parts/IconButton";
import Tag from "../conponent/parts/Tag";
import styled from "styled-components";

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200vh;
`;

export default function Example() {
  return (
    <Filter>
      <StyledBtn
        title="button"
        width="100px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor="pink"
        btnType="empty"
        handleClick={() => console.log("click")}
      ></StyledBtn>
      {"로그인, 회원가입"}
      <StyledBtn
        title="1"
        width="25px"
        height="25px"
        radius="100px"
        fontWeight={400}
        fontColor="pink"
        btnType="empty"
        handleClick={() => console.log("click")}
      ></StyledBtn>
      <StyledBtn
        title="1"
        width="25px"
        height="25px"
        radius="1000px"
        fontWeight={400}
        fontColor="white"
        btnType="full"
        handleClick={() => console.log("click")}
      ></StyledBtn>
      <IconBtn
        title="12"
        width="60px"
        height="36px"
        radius="5px"
        fontWeight={400}
        fontColor="white"
        btnType=""
        iconType="heart"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="30px"
        height="30px"
        radius=""
        fontWeight={400}
        fontColor="white"
        btnType=""
        iconType=""
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor="white"
        btnType="full"
        iconType="write"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor="pink"
        btnType=""
        iconType="delete"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor="pink"
        btnType=""
        iconType="treeDot"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="retweet"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="leftPlay"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="play"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="rightPlay"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="100px"
        height="100px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="noneImg"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="40px"
        height="40px"
        radius="5px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="downArrow"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="30px"
        height="30px"
        radius="100px"
        fontWeight={400}
        fontColor=""
        btnType="full"
        iconType="add"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="30px"
        height="30px"
        radius="100px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="logOut"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="30px"
        height="30px"
        radius="100px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="calender"
        border="none"
        handleClick={() => console.log("click")}
      />
      <IconBtn
        title=""
        width="30px"
        height="30px"
        radius="100px"
        fontWeight={400}
        fontColor=""
        btnType=""
        iconType="profile"
        border="none"
        handleClick={() => console.log("click")}
      />
      <Tag title="태그"></Tag>
      <SearchInput
        width="500px"
        height=""
        placeholder="searchInput"
      ></SearchInput>
      {"검색창"}
      <ButtonInput
        title="button"
        width="500px"
        height=""
        placeholder="buttonInput"
        handleClick={() => console.log("click")}
        style={{ padding: "4px 8px" }}
      ></ButtonInput>
      {"댓글창, 게시글 작성창"}
      <DefaultInput
        width="500px"
        height="36px"
        placeholder="Default"
      ></DefaultInput>
    </Filter>
  );
}
