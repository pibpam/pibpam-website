import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

const showUp = keyframes`
  0% {
    top: 100%;
    border-radius: ${theme.radius.xxl};
  }
  60% {
    border-radius: ${theme.radius.xxl};
  }
  100% {
    top: 0;
    border-radius: 0;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const Container = styled.div<{ $closed?: boolean }>`
  position: fixed;
  background: ${theme.colors.white};
  height: 100%;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${showUp} .5s ease-out forwards;

  ${({ $closed }) => $closed && css`
    top: 0;
    border-radius: 0;
    animation: ${fadeIn} .2s ease-out forwards;
  `}
`
