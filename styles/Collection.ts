import styled, { keyframes } from 'styled-components'
import { FiLoader } from 'react-icons/fi'
import theme from './theme'
import responsive from '../utils/responsive'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.xl};

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
  `}
`

export const View = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

export const HeaderModal = styled.div`
  position: absolute;
  top: 40px;
  right: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 14px;

  a,
  button {
    background: ${theme.colors.white};
    font-size: 24px;
    padding: ${theme.spacing.sm} 0;
    display: flex;
    align-items: center;
    height: 48px;
    justify-content: center;
    color: ${theme.colors.primary};
  }

  a {
    border-radius: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.base};
    gap: ${theme.spacing.sm};
    font-size: 20px;
  }

  button {
    width: 48px;
    border-radius: ${theme.radius.circle};
  }
`

export const Controller = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  left: 0;
  padding: ${theme.spacing.sm};

  > button {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    max-width: 32px;
    max-height: 32px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 32px;
    color: ${theme.colors.white};
    background: rgba(0, 0, 0, 0.5);
    position: relative;

    > svg {
      width: 24px;
      height: auto;
      stroke: ${theme.colors.white};
    }

    &:disabled {
      opacity: .5;
    }
  }
`

export const Modal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 21;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
  margin-bottom: 48px;

  > div {
    width: 100%;
    aspect-ratio: 16/9;
  }
`

export const Header = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  flex-direction: column;

  h2 {
    font-size: 24px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > p {
      margin-top: ${theme.spacing.sm};
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: ${theme.colors.primary};
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled(FiLoader)`
  animation: ${rotate} 1s linear infinite;
`
