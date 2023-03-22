import { useNavigate } from "react-router";
import Loading from "../conponent/parts/Loading";
import { SearchInput } from "../conponent/parts/InputNoH";
import IconBtn from "../conponent/parts/IconButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { requestAuth } from "../function/request";
import PostItem from "../conponent/post/PostItem";
import { Iurls } from "./AddPost";

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
  background-color: #151515;
`;

const Sort = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
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

export interface IListItem {
  id: number;
  title: string;
  category: string;
  content: string;
  memberId: number;
  memberName: string;
  createAt: string;
  modifiedAt: string;
  tags: string;
  urls: Iurls[];
  imageKey?: string;
  likeCount?: number;
  liked?: boolean;
}

export default function Posts() {
  const [category, setCategpry] = useState<string>("전체");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.textContent && setCategpry(e.currentTarget.textContent);
  };

  useEffect(() => {
    const ajaxWithLoading = async () => {
      try {
        setLoading(true);

        const res = await requestAuth.get(
          `/prf-posts?size=10&sorting=1${
            category !== "전체" ? `&category=${category}` : ""
          }${searchValue !== "" ? `&keyword=${searchValue}` : ""}`,
        );

        setResult(res.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };
    ajaxWithLoading();
  }, [category]);

  return (
    <Content>
      <SearchWrapper>
        <Search
          width="100%"
          placeholder="키워드를 입력해주세요."
          value={searchValue}
          setValue={setSearchValue}
        ></Search>
        <Sort>
          {["전체", "영화", "음악", "맛집"].map((x) => (
            <CategoryBtn
              isSelect={x === category}
              onClick={handleCatClick}
              key={x}
            >
              {x}
            </CategoryBtn>
          ))}
        </Sort>
      </SearchWrapper>
      {loading && <Loading />}
      {!loading &&
        result &&
        result.data.map((item: IListItem) => {
          return <PostItem key={item.id} item={item} />;
        })}

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
          handleClick={() => navigate("/addpost/create/new")}
        />
      </AddPosition>
    </Content>
  );
}
