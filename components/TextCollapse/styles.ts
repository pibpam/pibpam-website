import styled from 'styled-components'
import theme from '../../styles/theme'

export const Description = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0;
  position: relative;
  width: 100%;

  > div:first-child {
    max-height: 300px;
    overflow: hidden;
    transition: all .8s ease-in;
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

  > div:nth-child(2) {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    padding: ${theme.spacing.lg} ${theme.spacing.lg} 0;
    height: 120px;
    display: flex;
    align-items: end;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, ${theme.colors.white} 59.37%);
  }
`
