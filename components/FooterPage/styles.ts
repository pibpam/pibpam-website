import styled from 'styled-components'
import theme from '../../styles/theme'

export const Content = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 100px;
  background: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};

  > button {
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border: 1px solid ${theme.colors.gray700};
    border-radius: ${theme.radius.md};
    background: none;
    color: ${theme.colors.gray700};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.base};

    > div {
      display: flex;
      flex-direction: column;
      text-align: left;

      > span:first-child {
        font-weight: 300;
        font-size: 12px;
        line-height: 15px;
      }

      > span:last-child {
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
      }
    }

    > svg {
      font-size: 48px;
      stroke-width: 1px;
    }
  }
`
