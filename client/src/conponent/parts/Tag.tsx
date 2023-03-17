import styled from "styled-components";

interface prop {
  title: string;
}

const StyledSpan = styled.span`
  padding: 2px 4px;
  background-color: #ff3366;
  border: 2px solid #ff3366;
  border-radius: 4px;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 0.8rem;

  &:hover {
    background-color: transparent;
    color: #ff3366;
  }
`;

export default function Tag({ title }: prop) {
  return <StyledSpan>{title}</StyledSpan>;
}
