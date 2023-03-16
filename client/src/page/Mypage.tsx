import { useState } from "react";
import { useFetch } from "../util/MyApi";
import styled from "styled-components";
import UserEdit from "../conponent/mypage/UserEdit";
import Paging from "../conponent/mypage/Paging";

const MypageWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 4rem auto;
  color: #fff;
`;

const MyTabList = styled.ul`
  display: flex;
  margin-bottom: 3rem;
  border-bottom: 1px solid #3c3c3c;
`;

interface MyTabLiStyleProps {
  isActive: boolean;
}

const MyTabLi = styled.li<MyTabLiStyleProps>`
  padding: 0.85rem 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  border-bottom: ${(props) => (props.isActive ? "2px solid #ff3366" : null)};
  color: ${(props) => (props.isActive ? "#ff3366" : null)};
  &:hover {
    color: #ff3366;
  }
`;

const MypageTitle = styled.h4`
  display: flex;
  gap: 0.45rem;
  font-size: 1.35rem;
  font-weight: 400;
  letter-spacing: 0.025em;
`;

const MyBoard = styled.div`
  margin: 1.5rem 0 2rem;
  padding: 0 1.8rem;
  border: 1px solid #5a5959;
  border-radius: 0.63rem;
  background: #222;
`;

const MyBoardHead = styled.ul`
  display: flex;
  padding: 1.15rem 0;
  border-bottom: 1px solid #5a5959;
`;

const MyBoardHeadLi = styled.li`
  width: 94%;
  font-size: 0.85rem;
  text-align: center;
  &:first-child {
    width: 6%;
  }
`;

const MyBoardBody = styled.ul`
  padding: 1.4rem 0 2rem;
  flex-direction: column;
`;

interface MyBoardBodyLiStyleProps {
  isNone?: boolean;
}

const MyBoardBodyLi = styled.li<MyBoardBodyLiStyleProps>`
  display: flex;
  padding-left: ${(props) => (props.isNone ? "2.5rem" : null)};
  justify-content: ${(props) => (props.isNone ? "center" : null)};
  font-size: 0.85rem;
  line-height: 2.15;
  border-bottom: 1px dashed #151515;
  cursor: pointer;
  strong {
    width: 6%;
    text-align: center;
  }
  div {
    overflow: hidden;
    width: 94%;
    padding: 0 0.5rem;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  &:hover {
    color: #ff3366;
  }
`;

export default function Mypage() {
  //테스트 링크 지워야 함
  const tabArray = [
    {
      title: "작성한 게시글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
    },
    {
      title: "작성한 모집글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
    },
    {
      title: "참여한 모집글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
    },
    {
      title: "좋아요한 게시글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
    },
  ];
  const [tab, setTab] = useState(tabArray[0].title);
  const [list, pending, setUrl] = useFetch(`${tabArray[0].url}&page=1`);

  const handleTab = (item: string, url: string) => {
    setTab(item);
    setUrl(url);
  };

  return (
    <MypageWrap>
      <UserEdit />
      <MyTabList>
        {tabArray.map((el) => (
          <MyTabLi
            key={el.title}
            isActive={tab === el.title ? true : false}
            onClick={() => handleTab(el.title, el.url)}
          >
            {el.title}
          </MyTabLi>
        ))}
      </MyTabList>
      <section>
        <MypageTitle>{tab}</MypageTitle>
        <MyBoard>
          <MyBoardHead>
            <MyBoardHeadLi>글번호</MyBoardHeadLi>
            <MyBoardHeadLi>제목</MyBoardHeadLi>
          </MyBoardHead>
          <MyBoardBody>
            {pending ? <MyBoardBodyLi isNone>로딩중...</MyBoardBodyLi> : null}
            {list &&
              list.map((el, idx) => (
                <MyBoardBodyLi key={el.id}>
                  <strong>{idx + 1}</strong>
                  <div>{el.title}</div>
                </MyBoardBodyLi>
              ))}
          </MyBoardBody>
        </MyBoard>
        <Paging
          limit={5}
          total={22}
          url={tabArray.filter((el) => el.title === tab)[0].url}
          setUrl={setUrl}
        />
      </section>
    </MypageWrap>
  );
}
