import styled, { css, keyframes } from 'styled-components'
import theme from './theme'
import responsive from '../utils/responsive'

const checkSee = keyframes`
  from {
    background: ${theme.colors.secondary};
  }

  to {
    background: ${theme.colors.gray100};
  }
`

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 120px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  ${responsive.medium`
    max-width: 700px;
    margin: 0 auto;
    width: 100%;
  `}
`

export const Header = styled.div`
  font-size: 14px;
  margin-bottom: ${theme.spacing.base};
  margin-top: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray700};

  > div {
    background: ${theme.colors.gray225};
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border-radius: ${theme.radius.xxl};
  }
`

export const NoticeItem = styled.div<{ $addAnimation?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  font-size: 16px;
  font-weight: 400;
  position: relative;
  color: ${theme.colors.gray700};

  > span {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 10px;
    justify-content: flex-end;
  }

  ${({ $addAnimation }) => $addAnimation && css`
    animation: ${checkSee} 5s ease forwards;
  `}
`
