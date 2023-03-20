import styled from "styled-components";

interface prop {
  title: string;
  handleClick: (e: any) => void;
}
const PButton = styled.button`
  color: rgb(255 255 255 / var(--tw-text-opacity));
  height: 3.5rem;
  font-size: 1.25rem;
  text-align: left;
  padding-left: 24px;
  &:hover {
    background-color: #171717;
    cursor: pointer;
  }
`;

export default function PageButton({ title, handleClick }: prop) {
  return <PButton onClick={handleClick}>{title}</PButton>;
}
