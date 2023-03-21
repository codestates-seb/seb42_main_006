import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledBtn } from "../conponent/parts/Button";
import { media } from "../style/Media";
import CommonLi from "../conponent/main/CommonLi";
import BoxLi from "../conponent/main/BoxLi";

const MainWrap = styled.div`
  width: 100%;
  color: #fff;
  text-align: center;
  section {
    padding: 5rem 0;
    ${media.pc`
      padding: 5rem 2.66rem;
    `}
  }
  section.pink {
    background: #ff3366;
  }
  section.max {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const MainSlogan = styled.h2`
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.055em;
  .point {
    padding: 0.25rem 0;
    font-size: 4rem;
    font-weight: 400;
    color: #ff3366;
    ${media.mobile`
      font-size: 3.5rem;
    `}
  }
  &:after {
    display: block;
    width: 8rem;
    height: 5px;
    margin: 2rem auto;
    background: #ff3366;
    content: "";
  }
  ${media.mobile`
    font-size: 3.5rem;
  `}
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #3c3c3c;
  ${media.mobile`
    font-size: 2.5rem;
  `}
`;

export const MainText = styled.p`
  margin: 1.5rem 0;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.4;
  color: #3c3c3c;
  .break {
    ${media.mobile`
      display: none;
    `}
  }
`;

const CateList = styled.ul`
  display: flex;
  margin: 5rem 0 2rem;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  ${media.pc`
      flex-wrap:wrap;
  `}
`;

const ExList = styled.ul`
  display: grid;
  margin: 7rem 0;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  ${media.pc`
      gap: 1.5rem;
  `}
  ${media.mobile`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export default function Main() {
  const token = sessionStorage.getItem("auth");

  const categoryArr = [
    {
      type: "movie",
      label: "movie",
    },
    {
      type: "music",
      label: "Music",
    },
    {
      type: "food",
      label: "Hot Place",
    },
    {
      type: "flower",
      label: "Anywhere",
    },
    {
      type: "robot",
      label: "Always",
    },
  ];
  const experienceArr = [
    {
      type: "share",
      label: "Sharing",
      text: "우리의 서비스를 이용하면 자신이 좋아하는 음악, 맛집, 영화 등을 다른 사람들과 공유할 수 있습니다. 이를 통해 다양한 새로운 음악, 맛집, 영화 등을 발견할 수 있고, 또한 자신의 취향에 맞는 추천을 받을 수 있습니다.",
    },
    {
      type: "match",
      label: "Matching",
      text: "우리의 서비스는 취향이 비슷한 사람들끼리 매칭하는 기능도 제공합니다. 이를 통해 자신과 매칭되는 사람들과 소통하며 취향이 맞는 추천을 받을 수 있습니다. 우리 서비스는 쉽고 간편하게 이용할 수 있으며, 다양한 장르와 카테고리에서 추천을 받을 수 있습니다.",
    },
    {
      type: "recommend",
      label: "Recommending",
      text: "보유하고 있는 다양한 정보를 기반으로 최적화된 추천 시스템을 제공하여, 이용자들의 만족도를 높일 수 있습니다.",
    },
  ];

  return (
    <MainWrap>
      <section>
        <MainSlogan>
          당신의 경험, <strong className="point">MOHAE</strong>
          <br />
          에서 공유하세요
        </MainSlogan>
        <MainText>
          우리 서비스는 자신만의 음악, 맛집, 영화 등을 다른 사람들과 공유하고,
          취향이 비슷한 사람들끼리 매칭할 수 있는 서비스입니다.
          <br className="break" />
          취향이 비슷한 사람들과 소통하며 새로운 음악, 맛집, 영화 등을 발견하고
          싶으신 분들께, 저희의 서비스를 적극 추천드립니다!
          <br className="break" />
          우리 서비스는 자신의 취향을 공유하고, 취향이 비슷한 사람들끼리
          매칭하여 추천을 제공하는 서비스입니다. <br className="break" />
          "당신의 취향과 어울리는 추천을 놓치지 마세요! 우리 서비스가 당신의
          행복을 전달해드립니다."
        </MainText>

        <Link to={token ? "/addpost" : "/login"}>
          <StyledBtn
            title="A D D"
            width="12rem"
            height="2.8rem"
            radius="3rem"
            fontWeight={400}
            fontColor="white"
            btnType="full"
            handleClick={() => console.log("click")}
          ></StyledBtn>
        </Link>
      </section>
      <section className="pink">
        <MainTitle>Category</MainTitle>
        <CateList>
          {categoryArr.map((el) => (
            <CommonLi key={el.type} iconType={el.type} label={el.label} />
          ))}
        </CateList>
      </section>
      <section className="max">
        <MainTitle>Experience</MainTitle>
        <ExList>
          {experienceArr.map((el) => (
            <BoxLi
              key={el.type}
              iconType={el.type}
              label={el.label}
              text={el.text}
            />
          ))}
        </ExList>
      </section>
    </MainWrap>
  );
}
