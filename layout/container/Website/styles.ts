import styled, { keyframes } from 'styled-components';

const showUp = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Container = styled.main<{bottom?: number}>`
  position: relative;
  padding-bottom: ${({ bottom }) => bottom || 0}px;
  animation: ${showUp} .4s ease-in-out forwards;
`;
