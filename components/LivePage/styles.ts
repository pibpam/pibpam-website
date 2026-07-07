import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 90px;

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${theme.colors.gray700};
    margin-bottom: ${theme.spacing.base};
  }

  > p {
    margin-top: ${theme.spacing.base};
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.gray600};
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
      width: 24px;
      height: 24px;
      border-radius: ${theme.radius.circle};
      margin-right: ${theme.spacing.sm};
      background: url("/marco.png") center/cover;
    }
  }
`

export const TagLive = styled.div`
  padding: 0 ${theme.spacing.base};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.white};
  background: ${theme.colors.errorStrong};
  border-radius: ${theme.radius.pill};
  margin-left: auto;
`

export const TagDate = styled.div`
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
`
