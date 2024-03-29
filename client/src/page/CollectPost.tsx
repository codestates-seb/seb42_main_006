import React from "react";
import styled from "styled-components";
import { DefaultInput } from "../conponent/parts/InputNoH";
import { useEffect, useState } from "react";
import { Textarea } from "../conponent/parts/InputNoH";

import Selection from "../conponent/parts/Selection";
import IconBtn from "../conponent/parts/IconButton";
import { StyledBtn } from "../conponent/parts/Button";
import { useNavigate, useLocation, useParams } from "react-router";

import { collectPost, IData } from "../util/CollectPostApi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { requestAuth } from "../function/request";

import moment from "moment";

export default function CollectPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string>("");
  const [ages, setAges] = useState("");
  const [recruitNumber, setRecruitNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  // 리액트 라우터에 url쿼리로 원글의 아이디랑 category받아옴
  const query = new URLSearchParams(useLocation().search);
  const param = useParams();

  useEffect(() => {
    if (param.mode === "edit") {
      requestAuth.get(`/recruit-posts/${param.id}`).then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setBody(res.data.content);
        setTags(res.data.tags);
        setCategory(res.data.category);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const koreanTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  const tomorrow = new Date(koreanTime);
  tomorrow.setDate(tomorrow.getDate());

  const handleDateChange = (date: Date) => {
    setSelectedDate(moment(date).add(1, "day").toDate());
    setShowDatePicker(false);
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      console.log(ages);
      setAges(ages.concat(e.target.value));
    } else {
      setAges(ages.replace(e.target.value, ""));
    }
  };

  const handleSubmit = async () => {
    if (param.mode === "create") {
      if (title && body && recruitNumber && selectedDate && ages) {
        const data: IData = {
          prfPostId: Number(param.id),
          category: String(query.get("category")),
          title: title,
          content: body,
          recruitNumber: Number(recruitNumber),
          dueDate: selectedDate.toISOString().slice(0, 10).replace(/-/gi, "."),
          age: ages,
          tags: tags,
        };
        const res = await collectPost(data);
        if (res) {
          navigate("/collect");
        }
      } else {
        alert("*필수 입력 항목을 모두 작성해주세요.");
      }
    }
    if (param.mode === "edit") {
      if (title && body && recruitNumber && selectedDate && ages) {
        const data = {
          category: category,
          title: title,
          content: body,
          recruitNumber: Number(recruitNumber),
          dueDate: selectedDate.toISOString().slice(0, 10).replace(/-/gi, "."),
          age: ages,
          tags: tags,
        };
        requestAuth.patch(`/recruit-posts/${param.id}`, data).then((res) => {
          console.log(res);
          if (res.data.id) navigate(-1);
        });
      } else {
        alert("필수 입력 항목을 모두 작성해주세요.");
      }
    }
  };

  const ageGroups = [
    { id: "10대", label: "10대" },
    { id: "20대", label: "20대" },
    { id: "30대", label: "30대" },
    { id: "40대", label: "40대" },
  ];

  return (
    <>
      <Container>
        <Header>모집하기 글 작성</Header>
        <ContainerWrapper>
          <Title>제목</Title>
          <DefaultInput
            width="100%"
            placeholder="*제목"
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
            placeholder="*내용을 입력해주세요."
            row={10}
          ></Textarea>
        </ContainerWrapper>
        <ContainerWrapper>
          <div>
            <Title>태그</Title>
            <DefaultInput
              value={tags}
              setValue={setTags}
              width="100%"
              placeholder="#Tag1, #Tag2, #Tag3 ..."
            />
          </div>
          <div>
            <DateWrapper>
              <Title>모집기한</Title>
              {showDatePicker ? (
                <DatePick>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    minDate={tomorrow}
                  />
                </DatePick>
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
            </DateWrapper>
            <DateContainer>
              <div>
                {" "}
                {selectedDate
                  ? selectedDate.toISOString().slice(0, 10).replace(/-/gi, ".")
                  : "*날짜를 선택하세요."}
              </div>
            </DateContainer>
          </div>
          <PersonContainer>
            <PersonCounter>
              <Title>모집인원</Title>
              <Selection
                width="80%"
                opt={["*인원", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                setCategory={setRecruitNumber}
              ></Selection>
            </PersonCounter>
            <div>
              <Title>모집 연령</Title>
              <CheckboxContainer>
                <>
                  {ageGroups.map((ageGroup) => (
                    <div key={ageGroup.id}>
                      <input
                        type="checkbox"
                        id={ageGroup.id}
                        name="age"
                        value={ageGroup.label}
                        onChange={handleAgeChange}
                      />
                      <label htmlFor={ageGroup.id}>{ageGroup.label}</label>
                    </div>
                  ))}
                </>
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
            handleClick={handleSubmit}
          ></StyledBtn>
          <StyledBtn
            title="Cancel"
            width="100px"
            height="36px"
            radius="1000px"
            fontWeight={400}
            fontColor="pink"
            btnType="empty"
            handleClick={() => navigate(-1)}
          ></StyledBtn>
        </BtnWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 900px;
  min-width: 300px;
  color: white;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;
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
  min-height: 40px;
  padding-left: 5px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 2px solid #5a5959;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const PersonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.6rem;
  & > input[type="checkbox"] {
    margin-right: 4px;
  }
`;

const PersonCounter = styled.div`
  width: 50%;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const DatePick = styled.div`
  position: absolute;
  z-index: 1000px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`;
