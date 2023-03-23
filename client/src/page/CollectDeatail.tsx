import styled from "styled-components";
import IconBtn from "../conponent/parts/IconButton";
import { StyledBtn } from "../conponent/parts/Button";
import Tag from "../conponent/parts/Tag";
import CommentCreator from "../conponent/CommentCreator";
import CommentList from "../conponent/parts/CommentList";
import { requestAuth } from "../function/request";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

interface Post {
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
  nickName: string;
  age: string;
  tags: string;
}

export default function CollectDeatail() {
  const param = useParams();
  const [showOptions, setShowOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
    setIsEdit(false);
  };
  const [post, setPost] = useState<Post>({
    id: 1,
    title: "제목을 입력해주세요",
    category: "영화",
    content: "게시글 내용을적어주세요",
    recruitNumber: 5,
    currentNumber: 3,
    recruitStatus: "active",
    dueDate: "2023-03-08",
    createAt: "2023-02-25T17:41:46",
    modifiedAt: "2023-02-25T18:26:13",
    memberId: 1,
    nickName: "홍길동",
    age: "20대30대",
    tags: "#홍대#맛집#냉모밀",
  });
  const [render, setRender] = useState({});

  useEffect(() => {
    requestAuth
      .get<Post>(`/recruit-posts/${param.id}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (x: { content: string }) => {
    requestAuth
      .post(`/recruit-comments/${param.id}`, x)
      .then(() => setRender({}))
      .catch((error) => {
        console.log(error);
      });
  };

  // 쓰레기통 누르면 삭제되는 요청 보내기
  const handleDelete = () => {
    requestAuth.delete(`/recruit-posts/${param.id}`).then(() => {
      setRender({});
      navigate("/collect");
    });
  };

  return (
    <Content>
      <ContentWapper>
        <TopInfo>
          <TopInfoLeft>
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
            <UserName>{post.nickName}</UserName>
          </TopInfoLeft>
          <TopInfoRight>
            <TagRight>
              <IconBtn
                title=""
                width="50px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="white"
                btnType=""
                iconType="heart"
                handleClick={() => console.log("click")}
              />
            </TagRight>
            <TagRight>
              <StyledBtn
                title={
                  "참가인원" + post.currentNumber + "/" + post.recruitNumber
                }
                width="100px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="pink"
                btnType="empty"
                handleClick={() => console.log("click")}
              ></StyledBtn>
            </TagRight>
            <TagRight>
              <StyledBtn
                title="게시물 보러가기"
                width="110px"
                height="30px"
                radius="50px"
                fontWeight={400}
                fontColor="white"
                btnType="full"
                handleClick={() => console.log("click")}
              ></StyledBtn>
            </TagRight>
          </TopInfoRight>
        </TopInfo>
        <DetailPost>
          <TitleContent>
            <Title>{post.title}</Title>
            {showOptions && (
              <>
                <IconBtn
                  title=""
                  width="40px"
                  height="40px"
                  radius="5px"
                  fontWeight={400}
                  fontColor="red"
                  btnType=""
                  iconType="write"
                  border="none"
                  handleClick={() => setIsEdit(!isEdit)}
                />
                <IconBtn
                  title=""
                  width="40px"
                  height="40px"
                  radius="5px"
                  fontWeight={400}
                  fontColor="blue"
                  btnType=""
                  iconType="delete"
                  border="none"
                  handleClick={handleDelete}
                />
              </>
            )}
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
              handleClick={toggleOptions}
            />
          </TitleContent>
          <DetailContent>{post.content}</DetailContent>
        </DetailPost>
        <Tags>
          <TagInfo>
            <TagRight>
              <Tag title={post.category}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={post.age}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={"모집기한:" + post.dueDate}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={post.tags}></Tag>
            </TagRight>
          </TagInfo>
          <StyledBtn
            title="함께하기"
            width="100px"
            height="30px"
            radius="50px"
            fontWeight={400}
            fontColor="pink"
            btnType="empty"
            handleClick={() => console.log("click")}
          ></StyledBtn>
        </Tags>
        <UserRetweets>
          <RetweetContainer>
            <CommentCreator handleSubmit={handleSubmit}></CommentCreator>
            <CommentList
              postId={post.id}
              from="collect"
              reRender={render}
            ></CommentList>
          </RetweetContainer>
        </UserRetweets>
      </ContentWapper>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  min-width: 300px;
  margin: 24px auto;
  gap: 20px;
`;

const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TopInfoLeft = styled.div`
  display: flex;
`;

const TopInfoRight = styled.div`
  display: flex;
`;

const DetailPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  height: 100%;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  padding: 30px;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TagInfo = styled.div`
  display: flex;
`;

const TagRight = styled.div`
  margin-top: 2px;
  margin-right: 5px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  width: 90%;
`;

const DetailContent = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
`;

const UserName = styled.div`
  margin-left: 0.5rem;
  padding-top: 0.4rem;
`;

const UserRetweets = styled.div`
  display: flex;
  margin-top: 10px;
  padding-top: 0.4rem;

  color: white;
  font-size: 0.8rem;
  width: 100%;
  position: relative;
`;

const RetweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  /* border: 1px solid #4a4a4a; */
  width: 100%;
`;
