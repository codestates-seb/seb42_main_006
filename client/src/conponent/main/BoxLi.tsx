import styled from "styled-components";
import MainCategory from "../main/Category";
import { ListItemType } from "./CommonLi";
import { MainText } from "../../page/Main";

const ExListLi = styled.li`
  padding: 1.66rem;
  background: #222;
  border: 1px solid #3c3c3c;
  border-radius: 0.33rem;
`;

interface BoxType extends ListItemType {
  text: string;
}

export default function BoxLi({ iconType, label, text }: BoxType) {
  return (
    <ExListLi>
      <MainCategory iconType={iconType} border label={label} />
      <MainText>{text}</MainText>
    </ExListLi>
  );
}
