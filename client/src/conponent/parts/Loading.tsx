import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpin = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid;
  border-color: #ff3366 transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
`;

interface ILoadingProp {
  className?: any;
}

export default function Loading({ className }: ILoadingProp) {
  return <LoadingSpin className={className}></LoadingSpin>;
}
