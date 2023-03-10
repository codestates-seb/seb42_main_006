import styled from "styled-components";

interface prop {
  title: string;
}

const StyledSpan = styled.span`
  padding: 4px 8px;
  background-color: #ff3366;
  border: 2px solid #ff3366;
  border-radius: 4px;
  color: white;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    color: #ff3366;
  }
`;

export default function Tag({ title }: prop) {
  return <StyledSpan>{title}</StyledSpan>;
}
