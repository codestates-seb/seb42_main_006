import React, { SetStateAction, useState } from "react";
import styled from "styled-components";
import CommentCreator from "../CommentCreator";
import IconBtn from "./IconButton";
import { Props } from "./CommentList";
import { requestAuth } from "../../function/request";

interface Iitem {
  item: Props; // Comment 컴포넌트에서 사용할 데이터 객체
  from: "posts" | "collect"; // Comment 컴포넌트가 어떤 종류의 데이터에 대한 댓글인지를 나타냄
  parentId: number; //Comment 컴포넌트가 어떤 부모 엔티티에 대한 댓글인지를 식별하기 위한 값
  setRender: React.Dispatch<SetStateAction<{}>>; // 렌더링을 갱신하기 위한 React 디스패치 함수 타입
}

function Comment({ item, from, parentId, setRender }: Iitem) {
  const [showOptions, setShowOptions] = useState(false); // showOptions 상태 값과 해당 값을 변경하는 setShowOptions 함수 선언
  const [isEdit, setIsEdit] = useState(false); // isEdit 상태 값과 해당 값을 변경하는 setIsEdit 함수 선언

  // threedot 옵션
  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState); // showOptions 값을 이전 상태의 반대 값으로 토글
    setIsEdit(false); // isEdit 값을 false로 설정
  };

  const handleSubmit = (x: { content: string }) => {
    // 요청이 오는 곳이 posts 일경우
    if (from === "posts") {
      // 엔드포인트로 PATCH 요청을 보냄
      requestAuth.patch(`/prf-comments/${parentId}/${item.id}`, x).then(() => {
        // 랜더링 갱신
        setRender({});
        // 편집 모드 종료
        setIsEdit(false);
      });
      // 요청 오는 곳의 from값이 colloect 일경우
    } else if (from === "collect") {
      requestAuth
        // 엔드포인트로 PATCH 요청을 보냄
        .patch(`/recruit-comments/${parentId}/${item.id}`, x)
        .then(() => {
          // 랜더링 갱신
          setRender({});
          // 편집 모드 종료
          setIsEdit(false);
        });
    }
  };

  // 쓰레기통 누르면 삭제되는 요청 보내기
  const handleDelete = () => {
    // 요청 오는 곳의 from값이 posts 일경우
    if (from === "posts") {
      requestAuth.delete(`/prf-comments/${parentId}/${item.id}`).then(() => {
        setRender({});
      });
    } else if (from === "collect") {
      // 요청 오는 곳의 from값이 colloect 일경우
      requestAuth
        // 댓글 삭제
        .delete(`/recruit-comments/${parentId}/${item.id}`)
        .then(() => {
          // 이후 재랜더링
          setRender({});
        });
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
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
        <UserRetweet>
          <User>{item.nickname}</User>
          <div>{item.content}</div>
        </UserRetweet>
        <IconWrapper>
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
          {JSON.parse(sessionStorage.getItem("user") as string).id ===
            item.memberId && (
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
          )}
        </IconWrapper>
      </ContentWrapper>
      {isEdit && <CommentCreator handleSubmit={handleSubmit}></CommentCreator>}
    </Wrapper>
  );
}

export default Comment;

const User = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #4a4a4a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const UserRetweet = styled.div`
  font-size: 0.9rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
