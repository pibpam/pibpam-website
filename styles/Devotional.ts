import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg};

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${theme.colors.gray700};
    margin-bottom: ${theme.spacing.base};
  }

  > div:last-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.gray700};

    div, span, ul, ol, li, a, button, strong {
      font-family: inherit !important;
      font-size: inherit !important;
    }

    h2 {
      font-weight: 700 !important;
      font-size: 20px !important;
      margin-bottom: ${theme.spacing.base};
    }

    hr {
      background-color: ${theme.colors.secondary};
      height: 2px;
      border: none;
      border-radius: 1px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.base};
  gap: ${theme.spacing.lg};

  > div:first-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;

    > div {
      width: ${theme.spacing.lg};
      height: ${theme.spacing.lg};
      border-radius: ${theme.radius.circle};
      margin-right: ${theme.spacing.sm};
      background: url("/marco.png") center/cover;
    }
  }

  > div:last-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    > svg {
      font-size: 24px;
    }
  }
`
