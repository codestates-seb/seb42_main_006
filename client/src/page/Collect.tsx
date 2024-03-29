import CollectItem from "../conponent/collect/CollectItem";
import { SearchInput } from "../conponent/parts/InputNoH";
import Loading from "../conponent/parts/Loading";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { requestAuth } from "../function/request";
import useIntersectionObserver from "../util/useIntersectorObsevet";

export interface IListItem {
  id: number;
  title: string;
  category: string;
  content: string;
  recruitNumber: number;
  currentNumber: number;
  recruitStatus: string;
  dueDate: string;
  createAt: string;
  modifiedAt: string;
  memberId: number;
  tagName: string;
  age: string;
  tags: string;
  likeCount?: number;
  liked?: boolean;
}

export default function Collect() {
  const [category, setCategpry] = useState<string>("전체");
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(1);
  // const navigate = useNavigate();

  const target = useRef<HTMLDivElement | null>(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((page) => page + 1);
  });

  const handleSortClick = (x: number) => {
    setSort(x);
  };
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

        const res = await requestAuth.get(
          `/recruit-posts?page=${page}&size=10&sorting=${sort}${
            category !== "전체" ? `&category=${category}` : ""
          }${searchValue !== "" ? `&keyword=${searchValue}` : ""}`
        );
        console.log(res.data);
        setResult({ ...res.data });
        setList([...list, ...res.data.data]);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };
    if (page < result?.pageInfo.totalPages + 1 || page === 1) {
      ajaxWithLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  //카테고리 바뀔때 초기화
  useEffect(() => {
    setPage(1);
    setList([]);
  }, [category, keyword]);

  //page 1일때 옵저버 등록하고 마지막 page에서 제거
  useEffect(() => {
    if (page === 1) observe(target.current);

    const listCount = result?.data.length;
    const totalCount = result?.pageInfo.totalPages;

    if (0 === listCount || totalCount === page) {
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
                onClick={() => handleSortClick(idx + 1)}
                key={x}
              >
                {x}
              </CategoryBtn>
            ))}
          </div>
        </Sort>
      </SearchWrapper>
      <PostsContent />
      {list &&
        list.map((item: IListItem) => {
          return <CollectItem key={item.id} item={item} />;
        })}
      {loading && <Loading />}
      <div ref={target}></div>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  min-width: 370px;
  height: 100%;
  align-items: center;
  padding-top: 24px;
  gap: 10px;
  margin: 0 auto;
  padding: 10px;
`;

const Sort = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  color: white;
`;

const PostsContent = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SearchWrapper = styled.div`
  z-index: 500;
  width: 100%;
  position: sticky;
  top: 3.5rem;
  background-color: #151515;
`;

interface CategoryBtnProp {
  isSelect: any;
}
const CategoryBtn = styled.button<CategoryBtnProp>`
  padding: 4px 8px;
  border: none;
  outline: none;
  color: #fff;
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
