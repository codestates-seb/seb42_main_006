import { useNavigate } from "react-router";
import Loading from "../conponent/parts/Loading";
import { SearchInput } from "../conponent/parts/InputNoH";
import IconBtn from "../conponent/parts/IconButton";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import PostItem from "../conponent/post/PostItem";
import useIntersectionObserver from "../util/useIntersectorObsevet";
import { getPostList } from "../util/PostApi";
import { IItemDetail } from "../util/PostApi";

export default function Posts() {
  const [category, setCategpry] = useState<string>("전체");
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [trig, setTrig] = useState({});
  const [sort, setSort] = useState(1);

  const target = useRef<HTMLDivElement | null>(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    if (page < (result?.pageInfo.totalPages || 1) + 1) {
      setPage((page) => page + 1);
    }
  });
  const navigate = useNavigate();

  const handleCatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.textContent && setCategpry(e.currentTarget.textContent);
  };

  const handleSearch = () => {
    setKeyword(searchValue);
  };

  //page 늘어날때마다 get요청
  useEffect(() => {
    const ajaxWithLoading = async () => {
      try {
        setLoading(true);

        const res = await getPostList(page, sort, category, keyword);
        console.log(res.data);
        setResult({ ...res.data });
        setList([...list, ...res.data.data]);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (page < (result?.pageInfo.totalPages || 1) + 1) {
      ajaxWithLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, trig]);

  // page 1일때 옵저버 등록하고 마지막 page에서 제거
  useEffect(() => {
    if (page === 1) observe(target.current);
    if (0 === result?.data.length || result?.pageInfo.totalPages <= page) {
      unobserve(target.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  //로딩중일땐 옵저버 제거(중복요청 방지!!)
  useEffect(() => {
    if (loading) {
      unobserve(target.current);
    } else {
      observe(target.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  //카테고리 바뀔때 초기화
  useEffect(() => {
    if (!(page === 1 && list.length === 0)) {
      setPage(1);
      setList([]);
      setTrig({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, keyword, sort]);

  return (
    <Content>
      <SearchWrapper>
        <Search
          width="100%"
          placeholder="키워드를 입력해주세요."
          value={searchValue}
          setValue={setSearchValue}
          onSearch={handleSearch}
        ></Search>
        <Sort>
          <div>
            {["전체", "영화", "음악", "맛집"].map((x) => (
              <CategoryBtn
                isSelect={x === category}
                onClick={handleCatClick}
                key={x}
              >
                {x}
              </CategoryBtn>
            ))}
          </div>
          <div>
            {["최신순", "인기순"].map((x, idx) => (
              <CategoryBtn
                isSelect={idx === sort - 1}
                onClick={() => setSort(idx + 1)}
                key={x}
              >
                {x}
              </CategoryBtn>
            ))}
          </div>
        </Sort>
      </SearchWrapper>
      {list &&
        list.map((item: IItemDetail) => {
          return <PostItem key={item.id} item={item} />;
        })}
      {loading && <Loading />}
      <div ref={target}></div>

      <AddPosition>
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
          handleClick={() => navigate("/addpost/create")}
        />
      </AddPosition>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  min-width: 390px;
  height: 100%;
  align-items: center;
  padding-top: 24px;
  gap: 10px;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 3.5rem;
  background-color: rgba(21, 21, 21, 0.5);
`;

const Sort = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  color: white;
`;

const AddPosition = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

interface CategoryBtnProp {
  isSelect: any;
}

const CategoryBtn = styled.button<CategoryBtnProp>`
  padding: 4px 8px;
  border: none;
  outline: none;
  color: ${(props) => (props.isSelect ? "#f36" : "#fff")};
  border-bottom: ${(props) => (props.isSelect ? "2px solid #f36" : "none")};

  &:hover {
    color: ${(props) => (props.isSelect ? "#fff" : "#f36")};
  }
`;

const Search = styled(SearchInput)`
  > svg {
    width: 24px;
    height: 24px;
  }
`;
