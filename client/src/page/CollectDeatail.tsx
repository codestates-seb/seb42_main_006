import styled from "styled-components";
import Loading from "../conponent/parts/Loading";
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
  liked: boolean;
}

export default function CollectDeatail() {
  const param = useParams();
  // const [showOptions, setShowOptions] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);

  // const toggleOptions = () => {
  //   setShowOption((prevState) => !prevState);
  //   setIsEdit(false);
  // };

  const [post, setPost] = useState<Post>();
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [render, setRender] = useState({});

  useEffect(() => {
    requestAuth
      .get(`recruit-posts/${param.id}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      requestAuth
        .get(`recruit-posts/${param.id}/checkParticipation`)
        .then((res) => {
          console.log(res.data);
          setIsJoined(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [render]);

  const handleSubmit = (x: { content: string }) => {
    requestAuth
      .post(`recruit-comments/${param.id}`, x)
      .then(() => setRender({}))
      .catch((error) => {
        console.log(error);
      });
  };

  // 쓰레기통 누르면 삭제되는 요청 보내기
  const handleDelete = () => {
    requestAuth.delete(`recruit-posts/${param.id}`).then(() => {
      setRender({});
      navigate(-1);
    });
  };

  const handleLike = () => {
    console.log(post?.liked);
    if (post?.liked) {
      requestAuth
        .delete(`like/recruit-posts/${param.id}`, {})
        .then(() => {
          setPost({ ...post, liked: false });
          console.log(post?.liked);
        })
        .catch((err) => console.log(err));
    } else if (post?.liked === false) {
      requestAuth
        .post(`like/recruit-posts/${param.id}`, {})
        .then((res) => {
          setPost({ ...post, liked: true });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleJoin = () => {
    if (!!post) {
      if (
        JSON.parse(sessionStorage.getItem("user") as string).id !==
        post.memberId
      ) {
        if (post.currentNumber <= post.recruitNumber) {
          requestAuth
            .post(`/recruit-posts/${param.id}/participation`, {})
            .then((res) => {
              setPost(res.data);
              setRender({});
            })
            .catch((err) => console.log(err));
        }
      }
    }
  };

  const handleExit = () => {
    if (!!post) {
      if (post.currentNumber <= post.recruitNumber) {
        requestAuth
          .delete(`/recruit-posts/${param.id}/cancel`, {})
          .then((res) => {
            setRender({});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleClose = () => {
    requestAuth
      .patch(`/recruit-posts/${param.id}/close`)
      .then((res) => {
        navigate("/collect");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Content>
      {!!post ? (
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
                  width="30px"
                  height="30px"
                  radius="5px"
                  fontWeight={400}
                  fontColor="#f36"
                  btnType=""
                  iconType={post?.liked ? "fullheart" : "heart"}
                  border="none"
                  handleClick={handleLike}
                />
              </TagRight>

              <TagRight>
                <StyledBtn
                  title={
                    "함께하기 " + post.currentNumber + "/" + post.recruitNumber
                  }
                  width="100px"
                  height="30px"
                  radius="50px"
                  fontWeight={400}
                  fontColor={isJoined === false ? "pink" : "white"}
                  btnType={isJoined === false ? "empty" : "full"}
                  disabled={post.currentNumber >= post.recruitNumber}
                  handleClick={isJoined === false ? handleJoin : handleExit}
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
                  handleClick={() => console.log(navigate("/posts"))}
                ></StyledBtn>
              </TagRight>
            </TopInfoRight>
          </TopInfo>
          <DetailPost>
            <TitleContent>
              <Title>{post.title}</Title>
              {showOption && (
                <ButtonWrap>
                  <StyledBtn
                    title="모집글 닫기"
                    width="100px"
                    height="30px"
                    radius="50px"
                    fontWeight={400}
                    fontColor="pink"
                    btnType="empty"
                    handleClick={handleClose}
                  ></StyledBtn>
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
                    handleClick={() =>
                      navigate(`/collectpost/edit/${param.id}`)
                    }
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
                </ButtonWrap>
              )}
              {sessionStorage.getItem("user") &&
                JSON.parse(sessionStorage.getItem("user") as string).id ===
                  post.memberId && (
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
                    handleClick={() => setShowOption(!showOption)}
                  />
                )}
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
          </Tags>
          <UserRetweets>
            <RetweetContainer>
              {isJoined ||
              JSON.parse(sessionStorage.getItem("user") as string).id ===
                post.memberId ? (
                <>
                  <CommentCreator handleSubmit={handleSubmit}></CommentCreator>
                  <CommentList
                    postId={post.id}
                    from="collect"
                    reRender={render}
                  ></CommentList>
                </>
              ) : (
                <CommentBlock>
                  모집에 참여하셔야 댓글을 보실 수 있습니다.
                </CommentBlock>
              )}
            </RetweetContainer>
          </UserRetweets>
        </ContentWapper>
      ) : (
        <Loading></Loading>
      )}
    </Content>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CommentBlock = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  min-width: 300px;
  padding: 10px;
  margin: 24px auto;
`;

const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TopInfoLeft = styled.div`
  display: flex;
  align-items: center;
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
  padding: 1.5rem;
  margin-top: 5px;
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
  font-size: 1rem;
`;

const UserName = styled.div`
  margin-left: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
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
