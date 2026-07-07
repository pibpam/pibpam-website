import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.base} ${theme.spacing.lg} ${theme.spacing.xl};

  > p {
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.gray700};
    margin-bottom: ${theme.spacing.base};
  }
`

export const ButtonLink = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.primary};
  border-radius: 7px;
  background: transparent;
  width: 100%;

  > svg {
    font-size: 24px;
    color: ${theme.colors.primary};
  }
`

export const ButtonLinkLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.primary};
  border-radius: 7px;
  background: transparent;
  width: 100%;
  text-align: left;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;

    > div:first-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${theme.spacing.sm};

      button {
        text-decoration: underline;
        color: ${theme.colors.primary};
        background: transparent;
      }
    }
  }

  > svg {
    font-size: 24px;
    color: ${theme.colors.primary};
  }
`
