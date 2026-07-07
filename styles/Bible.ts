import styled from 'styled-components'
import theme from './theme'

export const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 56px ${theme.spacing.lg} ${theme.spacing.lg};
  width: 100%;
  transition: all .2s ease-in-out;

  background: ${theme.colors.gray700};
`

export const ContainerBooks = styled.div`
  padding: 140px ${theme.spacing.lg} 90px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  > button {
    text-align: left;
    padding: ${theme.spacing.sm} 14px;
    background: ${theme.colors.gray700};
    border-radius: 3px;
    color: ${theme.colors.white};
    border: none;
    font-weight: 400;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > svg {
      color: ${theme.colors.secondary};
    }
  }
`

export const ContainerChapter = styled.div`
  padding: 140px ${theme.spacing.lg} 90px;
  gap: ${theme.spacing.sm};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  > button {
    text-align: center;
    width: 50px;
    height: 40px;
    background: ${theme.colors.gray700};
    border-radius: 3px;
    color: ${theme.colors.white};
    border: none;
    font-weight: 400;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const ContainerVerse = styled.div`
  padding: 140px ${theme.spacing.lg} 90px;

  > p {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 20px;
    line-height: 28px;
    position: relative;
    text-indent: ${theme.spacing.lg};

    > sup {
      font-size: 12px;
      padding-bottom: ${theme.spacing.sm};
    }
  }
`
