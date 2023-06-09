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
  const [title, setTitle] = useState(""); // 제목 상태를 관리하는 useState 훅
  const [body, setBody] = useState(""); // 내용 상태를 관리하는 useState 훅
  const [tags, setTags] = useState<string>(""); // 태그 상태를 관리하는 useState 훅
  const [ages, setAges] = useState(""); // 모집 연령 상태를 관리하는 useState 훅
  const [recruitNumber, setRecruitNumber] = useState(""); // 모집인원 상태를 관리하는 useState 훅
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 모집기한을 관리하는 useState 훅
  const [showDatePicker, setShowDatePicker] = useState(false); // 모집기한 선택 여부를 관리하는 useState 훅
  const [category, setCategory] = useState(""); // 카테고리 상태를 관리하는 usseState 훅
  const navigate = useNavigate(); // 리엑트 라우터의 네비게이션 기능을 사용하기 위해 useNavigate 훅 사용
  const query = new URLSearchParams(useLocation().search); // 리액트 라우터에 url쿼리로 원글의 아이디랑 category받아옴
  const param = useParams(); /// 리액트 라우터의 useParams 훅을 사용하여 동적 라우트 파라미터를 받아옴

  // 편집 모드일때 서버로부터 해당 모집글의 데이터를 가져와 컴포넌트의 상태를 초기화 하는 역활 &
  // param.mode 값이 edit 일 때에만 실행 되는 컴포넌트
  useEffect(() => {
    if (param.mode === "edit") {
      // Axios 를 사용하여 동적으로 주어진 모집글의 정보를 가져오는 요청을 보낸다.
      requestAuth.get(`/recruit-posts/${param.id}`).then((res) => {
        console.log(res.data);
        // 가져온 데이터를 사용하여 상태를 업데이트 한다.
        setTitle(res.data.title);
        setBody(res.data.content);
        setTags(res.data.tags);
        setCategory(res.data.category);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 현재 한국 시간을 변수에 저장
  const koreanTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });

  // 오늘의 날짜를 변수에 저장
  const tomorrow = new Date(koreanTime);
  tomorrow.setDate(tomorrow.getDate());

  /**
   * @param date DatePicker에서 선택된 날짜
   */
  const handleDateChange = (date: Date) => {
    // moment(date)를 사용하여 선택된 날짜를 Moment 객체로 변환합니다.
    // Moment 객체의 add() 메서드를 사용하여 1일을 더한 후, toDate()를 호출하여 다시 Date 객체로 변환합니다.
    // 1일을 더한 이유는 날짜 선택시 하루 정도는 모집기한을 두기 위해 1일을 추가 시켰습니다.
    setSelectedDate(moment(date).add(1, "day").toDate());

    // setShowDatePicker() 함수를 호출하여 DatePicker를 숨깁니다.
    setShowDatePicker(false);
  };

  //함수 실행시 DatePicker 아이콘이 화면에 표시됩니다.
  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  /**
   * 체크박스의 상태가 변경되었을 때 호출되는 함수
   * @param e 이 매개변수는 체크박스 이벤트 객체인 React.ChangeEvent<HTMLInputElement> 타입
   */
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스가 선택되었는지 확인합니다.
    if (e.target.checked) {
      console.log(ages);
      // ages 상태에 e.target.value 값을 추가합니다.
      setAges(ages.concat(e.target.value));
    } else {
      // 체크박스가 선택 해제되었을 때, ages 상태에서 e.target.value 값을 제거합니다.
      setAges(ages.replace(e.target.value, ""));
    }
  };

  const handleSubmit = async () => {
    // "create" 모드일 경우
    if (param.mode === "create") {
      // 필수 입력 항목이 모두 입력되었는지 확인합니다.
      if (title && body && recruitNumber && selectedDate && ages) {
        // 데이터 객체를 생성합니다.
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
        // collectPost 함수를 호출하여 데이터를 전송합니다.
        const res = await collectPost(data);
        if (res) {
          // 전송이 성공하면 "/collect" 페이지로 이동합니다.
          navigate("/collect");
        }
      } else {
        // 필수 입력 항목이 누락되었을 경우 알림을 표시합니다.
        alert("*필수 입력 항목을 모두 작성해주세요.");
      }
    }

    // "edit" 모드일 경우
    if (param.mode === "edit") {
      // 필수 입력 항목이 모두 입력되었는지 확인합니다.
      if (title && body && recruitNumber && selectedDate && ages) {
        // 데이터 객체를 생성합니다.
        const data = {
          category: category,
          title: title,
          content: body,
          recruitNumber: Number(recruitNumber),
          dueDate: selectedDate.toISOString().slice(0, 10).replace(/-/gi, "."),
          age: ages,
          tags: tags,
        };
        // 서버에 데이터를 업데이트하는 PATCH 요청을 보냅니다.
        requestAuth.patch(`/recruit-posts/${param.id}`, data).then((res) => {
          console.log(res);
          if (res.data.id) navigate(-1);
        });
      } else {
        // 필수 입력 항목이 누락되었을 경우 알림을 표시합니다.
        alert("필수 입력 항목을 모두 작성해주세요.");
      }
    }
  };

  /**
   * 나이 그룹을 나타내는 배열입니다.
   * 각 요소는 `id`와 `label` 속성을 가지고 있습니다.
   * - `id`: 나이 그룹의 식별자입니다.
   * - `label`: 나이 그룹을 표시하는 라벨입니다.
   *
   * 예시:
   * ageGroups[0].id // "10대"
   * ageGroups[0].label // "10대"
   */
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
