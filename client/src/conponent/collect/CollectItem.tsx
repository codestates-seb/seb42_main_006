import React from "react";
import Tag from "../parts/Tag";
import styled from "styled-components";
import { useNavigate } from "react-router";
import IconBtn from "../parts/IconButton";
import { requestAuth } from "../../function/request";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
interface Posts {
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
}

export default function CollectItem() {
  const Navigate = useNavigate();
  const param = useParams();

  const [posts, setPosts] = useState<Posts[]>([
    {
      id: 1,
      title: "영화같이봐요",
      category: "영화",
      content: "내용입니다",
      recruitNumber: 5,
      currentNumber: 3,
      recruitStatus: "active",
      dueDate: "2023-03-08",
      createAt: "2023-02-25T17:41:46",
      modifiedAt: "2023-02-25T18:26:13",
      memberId: 1,
      tagName: "박새로이",
      age: "20대30대",
      tags: "#홍대#아이언맨",
    },
    {
      id: 2,
      title: "맛집같이가봐요",
      category: "맛집",
      content: "내용입니다",
      recruitNumber: 8,
      currentNumber: 3,
      recruitStatus: "active",
      dueDate: "2023-03-08",
      createAt: "2023-02-25T17:41:46",
      modifiedAt: "2023-02-25T18:26:13",
      memberId: 1,
      tagName: "홍길동",
      age: "30대40대",
      tags: "#건대#맛집#냉모밀",
    },
  ]);

  useEffect(() => {
    requestAuth
      .get<Posts[]>(`/recruit-posts?page=X&size=Y&sorting=Z`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {posts.map((posts) => (
        <Wrapper>
          <UserIcon>
            <IconBtn
              title=""
              width="100%"
              height=""
              radius="100px"
              fontWeight={400}
              fontColor=""
              btnType=""
              iconType="profile"
              border="none"
              handleClick={() => console.log("click")}
            />
          </UserIcon>
          <PostDetail
            onClick={() => Navigate(`/collectdeatail/${param.recruiteId}`)}
          >
            <Title>{posts.title}</Title>
            <Summary>{posts.content}</Summary>
            <TagInfo>
              <TagRight>
                <Tag title={posts.category}></Tag>
              </TagRight>
              <TagRight>
                <Tag title={posts.age}></Tag>
              </TagRight>
              <TagRight>
                <Tag title={"모집기한:" + posts.dueDate}></Tag>
              </TagRight>
              <TagRight>
                <Tag title={posts.tags}></Tag>
              </TagRight>
            </TagInfo>
          </PostDetail>
          <IconSort>
            <IconBtn
              title=""
              width="60px"
              height="36px"
              radius="5px"
              fontWeight={400}
              fontColor="white"
              btnType=""
              iconType="heart"
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
          </IconSort>
        </Wrapper>
      ))}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-height: 150px;
  padding: 10px;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  margin-bottom: 10px;
`;

const PostDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  flex: 1 1 auto;
  margin-left: 0px; /* 왼쪽 여백을 20px로 설정 */
  margin-bottom: 20px;
  margin-top: 10px;
  padding-bottom: 5px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 10px; // 각 내부 div들에도 margin-bottom 속성을 추가합니다.
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Summary = styled.div`
  width: 100%;
  font-size: 1.1rem;
  color: #5a5959;
  margin-bottom: 5px;
  height: 60px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const IconSort = styled.div`
  display: flex;
  justify-content: center;
  width: 5rem;
`;

const UserIcon = styled.div`
  width: 20%;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 80%;
    height: 80%;
  }
`;

const TagInfo = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const TagRight = styled.div`
  margin-top: 2px;
  margin-right: 5px;
`;
