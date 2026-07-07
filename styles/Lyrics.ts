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
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > svg {
      margin-left: auto;
    }

    > span {
      margin-right: ${theme.spacing.sm};
      font-weight: 600;
    }

    > svg,
    > span {
      color: ${theme.colors.secondary};
    }
  }
`

export const ContainerLyric = styled.div`
  padding: 140px ${theme.spacing.lg} 90px;

  h4 {
    font-size: 24px;
    color: ${theme.colors.gray700};

    span {
      font-weight: 300;
    }
  }

  h5 {
    font-size: 16px;
    font-weight: 400;
    color: ${theme.colors.gray700};
    margin: 0;
    margin-top: ${theme.spacing.sm};
  }

  > div {
    font-size: 20px;
    line-height: 28px;
    color: ${theme.colors.gray700};
    margin-top: ${theme.spacing.lg};

    p {
      margin-bottom: 28px;
    }
  }
`
