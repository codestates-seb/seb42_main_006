import { useState } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../util/MyApi";
import styled from "styled-components";
import { media } from "../style/Media";
import UserEdit from "../conponent/mypage/UserEdit";
import Paging from "../conponent/mypage/Paging";
import { useUserInfo } from "../util/MyApi";

const MypageWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 4rem auto;
  color: #fff;
  ${media.pc`
      padding: 0 1.66rem;
  `}
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
  ${media.mobile`
    flex-grow:1;
    white-space: pre-wrap;
    text-align:center;
  `}
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

const minHead = "3.5rem";

const MyBoardHeadLi = styled.li`
  width: calc(100% - ${minHead});
  font-size: 0.85rem;
  text-align: center;
  &:first-child {
    width: ${minHead};
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
  font-size: 0.88rem;
  line-height: 2.15;
  border-bottom: 1px dashed #151515;
  cursor: pointer;
  .MyBoardTitle {
    width: ${minHead};
    text-align: center;
  }
  .MyBoardContent {
    overflow: hidden;
    width: calc(100% - ${minHead});
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
  const navigate = useNavigate();
  const token = sessionStorage.getItem("auth");
  if (!token) {
    navigate("/login");
  }

  const [info] = useUserInfo(`/members/mypage`);

  let userInfo: any = {};
  userInfo = info;

  const tabArray = [
    {
      title: "작성한\n게시글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
      //url : `/members/prf-post`
    },
    {
      title: "작성한\n모집글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
      //url : `/members/recruit-posts`
    },
    {
      title: "참여한\n모집글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
      //url : `/members/participation`
    },
    {
      title: "좋아요한\n게시글",
      url: `https://api.github.com/repositories/1300192/issues?per_page=10`,
      //url : `/members/prf-post-like`
    },
  ];
  const [tab, setTab] = useState(tabArray[0].title);
  const [list, pending, setUrl] = useFetch(`${tabArray[0].url}&page=1`);
  //  const [list, pending, setUrl] = useFetch(`${tabArray[0].url}?page=${num}&size=10`);

  const limit = 5;
  const [curr, setCurr] = useState(1);
  const [total, setTotal] = useState(22);
  // const [total, setTotal] = useState(list.pageInfo.totalPages || 1);
  const [arr, setArr] = useState(
    Array.from(
      { length: limit > total ? total : limit },
      (_, index) => index + 1
    )
  );

  const handleTab = (item: string, url: string) => {
    setTab(item);
    setUrl(url);
    setCurr(1);
    setArr(Array.from({ length: limit }, (_, index) => index + 1));
    // setTotal(list.pageInfo.totalPages);
    setTotal(10);
  };

  const handlePaging = (num: number) => {
    setCurr(num);
    setUrl(`${tabArray.filter((el) => el.title === tab)[0].url}&page=${num}`);
    // setUrl(`${tabArray.filter((el) => el.title === tab)[0].url}?page=${num}&size=10`);
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
    <MypageWrap>
      <UserEdit userInfo={userInfo} />
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
            {["글번호", "제목"].map((el) => (
              <MyBoardHeadLi key={el}>{el}</MyBoardHeadLi>
            ))}
          </MyBoardHead>
          <MyBoardBody>
            {pending || !list.length ? (
              <MyBoardBodyLi isNone>
                {pending ? "로딩중..." : "게시글이 없습니다"}
              </MyBoardBodyLi>
            ) : null}
            {list &&
              list.map((el, idx) => (
                <MyBoardBodyLi key={el.id}>
                  <strong className="MyBoardTitle">
                    {total * 10 - ((curr - 1) * 10 + idx)}
                  </strong>
                  <div className="MyBoardContent">{el.title}</div>
                </MyBoardBodyLi>
              ))}
          </MyBoardBody>
        </MyBoard>
        <Paging
          curr={curr}
          arr={arr}
          total={total}
          handlePaging={handlePaging}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </section>
    </MypageWrap>
  );
}
