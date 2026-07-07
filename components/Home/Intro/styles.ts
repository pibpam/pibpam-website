import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  background: ${theme.colors.primary};
  padding: ${theme.spacing.xl} ${theme.spacing.lg} calc(${theme.spacing.xl} + 90px);

  > p {
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: ${theme.colors.gray750};
    margin-top: 48px;
  }
`

export const MemberArea = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.white};
  background: transparent;
  border: 2px solid ${theme.colors.white};
  border-radius: ${theme.radius.md};
  width: 100%;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.base};

  > div {
    text-align: left;

    h3 {
      font-size: 24px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
    }
  }

  > svg {
    width: 40px;
    height: auto;
  }
`

export const BannerContainer = styled.div`
  margin-top: 48px;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`
