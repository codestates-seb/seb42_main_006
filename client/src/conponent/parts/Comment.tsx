import { useState, useEffect } from "react";
import styled from "styled-components";
import CommentCreator from "../CommentCreator";
import IconBtn from "./IconButton";
import { useParams } from "react-router";
import { requestAuth } from "../../function/request";

interface Props {
  id: number;
  content: string;
  createAt: string;
  modifiedAt: string;
  memberId: number;
  nickName: string;
}

function Comment() {
  const [showOptions, setShowOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const param = useParams();

  const [comment, setComment] = useState<Props[]>([
    {
      id: 1,
      content: "글이 좋아요",
      createAt: "2023-02-25T17:41:46",
      modifiedAt: "2023-02-25T18:26:13",
      memberId: 1,
      nickName: "홍길동",
    },
    {
      id: 2,
      content: "글이 이뻐요",
      createAt: "2023-02-25T17:41:46",
      modifiedAt: "2023-02-25T18:26:13",
      memberId: 2,
      nickName: "사과머리",
    },
  ]);

  useEffect(() => {
    requestAuth
      .get<Props[]>(`/prf-comments/${param.recruiteId}`)
      .then((res) => {
        setComment(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
    setIsEdit(false);
  };

  return (
    <AllWrapper>
      {comment.map((comment) => (
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
              <User>{comment.nickName}</User>
              <div>{comment.content}</div>
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
                    handleClick={() => console.log("")}
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
            </IconWrapper>
          </ContentWrapper>
          {isEdit && <CommentCreator></CommentCreator>}
        </Wrapper>
      ))}
    </AllWrapper>
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

const AllWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
