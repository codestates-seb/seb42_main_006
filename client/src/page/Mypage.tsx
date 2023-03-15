import { useState } from "react";
import styled from "styled-components";
import Paging from "../conponent/mypage/Paging";
import UserEdit from "../conponent/mypage/UserEdit";
import { useFetch } from "../util/MyApi";

const MypageWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 4rem auto;
  color: #fff;
  h3 {
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #3c3c3c;
  }
  ul {
    display: flex;
    li {
      font-size: 0.85rem;
    }
  }
`;

const MyTab = styled.section`
  margin-bottom: 3rem;
  ul {
    border-bottom: 1px solid #3c3c3c;
    li {
      padding: 0.85rem 0.8rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 400;

      &:hover {
        color: #ff3366;
      }
    }
    li.active {
      border-bottom: 2px solid #ff3366;
      color: #ff3366;
    }
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
  padding: 1.15rem 0;
  border-bottom: 1px solid #5a5959;
  li {
    width: 94%;
    text-align: center;
    &:first-child {
      width: 6%;
    }
  }
`;

const MyBoardBody = styled.ul`
  padding: 1.4rem 0 2rem;
  flex-direction: column;
  li {
    display: flex;
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
  }
  li.noList {
    display: flex;
    padding-left: 2.5rem;
    justify-content: center;
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
      <MyTab>
        <ul>
          {tabArray.map((el) => (
            <li
              key={el.title}
              className={tab === el.title ? "active" : undefined}
              onClick={() => handleTab(el.title, el.url)}
            >
              {el.title}
            </li>
          ))}
        </ul>
      </MyTab>
      <section>
        <MypageTitle>{tab}</MypageTitle>
        <MyBoard>
          <MyBoardHead>
            <li>글번호</li>
            <li>제목</li>
          </MyBoardHead>
          <MyBoardBody>
            {pending ? <li className="noList">로딩중...</li> : null}
            {list &&
              list.map((el, idx) => (
                <li key={el.id}>
                  <strong>{idx + 1}</strong>
                  <div>{el.title}</div>
                </li>
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
