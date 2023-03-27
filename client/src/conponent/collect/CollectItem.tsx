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

  return (
    <>
      <Content>
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
          <PostWapper>
            <PostDetail onClick={() => Navigate(`/collectdeatail/${item.id}`)}>
              <Title>{item.title}</Title>
              <Summary>{item.content}</Summary>
            </PostDetail>
            <TagInfo>
              <TagRight>
                <Tag title={item.category}></Tag>
                <Tag title={item.age}></Tag>
                <Tag title={"모집기한:" + item.dueDate}></Tag>
                <Tag title={item.tags}></Tag>
              </TagRight>
            </TagInfo>
          </PostWapper>
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
          {item.recruitStatus !== "ACTIVE" && <Cover />}
        </Wrapper>
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
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
  cursor: pointer;
`;

const PostWapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
`;

const Summary = styled.div`
  width: 100%;
  font-size: 1.1rem;
  color: #5a5959;
  height: 60px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const IconSort = styled.div`
  display: flex;
  justify-content: center;
  width: 1rem;
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
  max-width: 21rem;
  overflow-x: auto;
`;

const TagRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 2rem;
  white-space: nowrap;
  flex-wrap: nowrap;
  gap: 3px;
`;
