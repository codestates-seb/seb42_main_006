import React from "react";
import Tag from "../parts/Tag";
import styled from "styled-components";
import { useNavigate } from "react-router";
import IconBtn from "../parts/IconButton";
// import { requestAuth } from "../../function/request";
// import { useState, useEffect } from "react";
import { IListItem } from "../../page/Collect";
export interface Props {
  item: IListItem;
}

export default function CollectItem({ item }: Props) {
  const Navigate = useNavigate();

  const isExpired = (x: string): boolean => {
    const dueDate = new Date(x);
    const cur = new Date();
    return dueDate.valueOf() - cur.valueOf() > 0 ? true : false;
  };

  return (
    <>
      <Wrapper key={item.id}>
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
        <PostDetail onClick={() => Navigate(`/collectdeatail/${item.id}`)}>
          <Title>{item.title}</Title>
          <Summary>{item.content}</Summary>
          <TagInfo>
            <TagRight>
              <Tag title={item.category}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={item.age}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={"모집기한:" + item.dueDate}></Tag>
            </TagRight>
            <TagRight>
              <Tag title={item.tags}></Tag>
            </TagRight>
          </TagInfo>
        </PostDetail>
        <IconSort>
          <IconBtn
            title={
              item.likeCount && item.likeCount > 0 ? `${item.likeCount}` : ""
            }
            width=""
            height="30px"
            radius="5px"
            fontWeight={400}
            fontColor="pink"
            btnType=""
            iconType={item.liked ? "fullheart" : "heart"}
            border="none"
            handleClick={() => {}}
          />
        </IconSort>
        {item.recruitStatus !== "ACTIVE" && isExpired(item.dueDate) && (
          <Cover />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* space-between으로 변경 */
  align-items: center;
  width: 100%;
  height: 150px;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #222222;
  padding: 16px; /* 3개의 간격을 주기 위해 padding을 추가 */
  gap: 16px;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 300;
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
  width: 2rem;
`;

const UserIcon = styled.div`
  width: 20%;
  min-width: 70px;
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
