import React from "react";
import styled from "styled-components";
import { DefaultInput } from "../conponent/parts/InputNoH";
import { useState } from "react";
import { Textarea } from "../conponent/parts/InputNoH";
import { TagInput } from "../conponent/parts/InputNoH";
import Tag from "../conponent/parts/Tag";
import Selection from "../conponent/parts/Selection";
import IconBtn from "../conponent/parts/IconButton";
import { StyledBtn } from "../conponent/parts/Button";
import { useNavigate } from "react-router";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 800px;
  color: white;
  /* border: 2px solid #5a5959; */
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 25rem;
`;

const Header = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 1.8rem;
  padding: 1rem;
`;

const Title = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 5px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 5px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 2px solid #5a5959;
  margin-bottom: 5px;
  margin-top: 5px;
  z-index: 100;
`;

const PersonContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  & > input[type="checkbox"] {
    margin-right: 4px;
  }
`;

const PersonCounter = styled.div`
  width: 400px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export default function CollectPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [curCategory, setCurCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTags = (x: string) => {
    setTags((prev) => [...prev, x]);
  };
  const handleDeleteTags = () => {
    setTags((prev) => [...prev].slice(0, prev.length - 1));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  // const handleChange = () => {
  //   setChecked(!checked);
  // };

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header>모집하기 글 작성</Header>
        <ContainerWrapper>
          <Title>제목</Title>
          <DefaultInput
            width="100%"
            placeholder="제목"
            value={title}
            setValue={setTitle}
          ></DefaultInput>
        </ContainerWrapper>
        <ContainerWrapper>
          <Title>내용</Title>
          <Textarea
            width="100%"
            value={body}
            setValue={setBody}
            placeholder="내용을 입력해주세요."
            row={10}
          ></Textarea>
        </ContainerWrapper>
        <ContainerWrapper>
          <div>
            <Title>태그</Title>
            <TagInput
              width="100%"
              addTags={handleAddTags}
              deleteTags={handleDeleteTags}
            >
              {tags.map((x, idx) => (
                <Tag title={x} key={idx}></Tag>
              ))}
            </TagInput>
          </div>
          <div>
            <Title>모집기한</Title>
            <DateContainer>
              <div>
                {" "}
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "날짜를 선택하세요."}
              </div>
              {showDatePicker ? (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                />
              ) : (
                <IconBtn
                  title=""
                  width="30px"
                  height="30px"
                  radius="100px"
                  fontWeight={400}
                  fontColor=""
                  btnType=""
                  iconType="calender"
                  border="none"
                  handleClick={handleDateClick}
                />
              )}
            </DateContainer>
          </div>
          <PersonContainer>
            <PersonCounter>
              <Title>모집인원</Title>
              <Selection
                width="80%"
                opt={["2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                setCategory={setCurCategory}
              ></Selection>
            </PersonCounter>
            <div>
              <Title>연령대</Title>
              <CheckboxContainer>
                <input type="checkbox" id="10대" name="age" value="10대" />
                <label htmlFor="10대">10대</label>
                <input type="checkbox" id="20대" name="age" value="20대" />
                <label htmlFor="20대">20대</label>
                <input type="checkbox" id="30대" name="age" value="30대" />
                <label htmlFor="30대">30대</label>
                <input type="checkbox" id="40대" name="age" value="40대" />
                <label htmlFor="40대">40대</label>
              </CheckboxContainer>
            </div>
          </PersonContainer>
        </ContainerWrapper>
        <BtnWrapper>
          <StyledBtn
            title="Submit"
            width="100px"
            height="36px"
            radius="1000px"
            fontWeight={400}
            fontColor="white"
            btnType="full"
            handleClick={() => console.log(body)}
          ></StyledBtn>
          <StyledBtn
            title="Cancel"
            width="100px"
            height="36px"
            radius="1000px"
            fontWeight={400}
            fontColor="pink"
            btnType="empty"
            handleClick={() => navigate("/posts")}
          ></StyledBtn>
        </BtnWrapper>
      </Container>
    </>
  );
}
