import styled from "styled-components";

interface prop {
  title?: string;
  children?: React.ReactNode;
}

const StyledSpan = styled.span`
  padding: 2px 4px;
  background-color: #ff3366;
  border: 2px solid #ff3366;
  border-radius: 4px;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 0.8rem;
  min-width: max-content;

  &:hover {
    background-color: transparent;
    color: #ff3366;
  }
`;

export default function Tag({ title, children }: prop) {
  return <StyledSpan>{title || children}</StyledSpan>;
}
