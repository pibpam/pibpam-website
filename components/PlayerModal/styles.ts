import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

const showUp = keyframes`
  from {
    top: 100vh;
  }

  to {
    top: 0;
  }
`

const hideDown = keyframes`
  to {
    top: 100vh;
  }

  from {
    top: 0;
  }
`

export const Container = styled.div<{ $closing?: boolean }>`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: ${theme.colors.white};
  z-index: 21;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  animation: ${showUp} .5s ease;

  > button {
    position: absolute;
    right: 40px;
    top: 40px;
    width: 56px;
    height: 56px;
    border-radius: ${theme.radius.circle};
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ $closing }) => $closing && css`
    animation: ${hideDown} .5s ease forwards !important;
  `}
`

export const Content = styled.div`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  z-index: 1;
  position: relative;

  > h3 {
    font-size: 32px;
    margin-bottom: 4px;
    font-weight: 500;
  }

  > p {
    font-weight: 400;
    font-size: 18px;
  }

  > div {
    margin-top: ${theme.spacing.xl};
    border-radius: ${theme.radius.sm};
    overflow: hidden;
  }
`

export const Footer = styled.div`
  margin-top: auto;
  z-index: 0;
  position: relative;
`
