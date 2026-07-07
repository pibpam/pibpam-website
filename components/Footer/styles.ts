import styled from 'styled-components'
import theme from '../../styles/theme'

export const FooterEl = styled.footer`
  position: relative;
  z-index: 3;
  background: ${theme.colors.gray700};

  > svg {
    width: 100%;
    margin-top: -42px;
  }
`

export const FooterInfo = styled.div`
  max-width: 1440px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.xl} 0;

  > div {
    padding: 0 ${theme.spacing.xl};
    border-left: 2px solid rgba(181, 218, 53, 0.2);
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.gray100};

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    h4 {
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      color: ${theme.colors.secondary};
    }

    &:nth-child(1) {
      display: flex;
      align-items: center;
      border-left: 0px;

      svg,
      path {
        fill: ${theme.colors.white};
      }
    }

    &:nth-child(2) {
      h4 {
        margin-bottom: 10px;
      }

      p:nth-child(2) {
        margin-bottom: ${theme.spacing.xl};
      }

      p:nth-child(3) {
        margin-bottom: ${theme.spacing.md};
      }

      p:nth-child(4) {
        margin-bottom: 40px;
      }
    }

    &:nth-child(3) {
      display: flex;
      flex-direction: column;

      ul {
        margin: auto 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }

    &:nth-child(4) {
      display: flex;
      flex-direction: column;

      ul {
        margin: auto 0;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
        }
      }
    }
  }
`

export const Copy = styled.div`
  background: ${theme.colors.gray900};
  padding: ${theme.spacing.base};
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`
