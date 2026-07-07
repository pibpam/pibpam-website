import styled from 'styled-components'
import theme from './theme'

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${theme.colors.white} 0%, ${theme.colors.tealTintLight} 55%, ${theme.colors.limeTint} 100%);
  padding: ${theme.spacing.lg} ${theme.spacing.base};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: ${theme.spacing.xl};
  }
`

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.tealBorderCard};
  border-radius: ${theme.radius.xxxl};
  padding: ${theme.spacing.lg};
  box-shadow: 0 14px 34px rgba(47, 42, 42, 0.08);

  @media (min-width: 768px) {
    padding: 30px;
  }
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.sm};
`

export const Description = styled.p`
  color: ${theme.colors.gray650};
  margin-bottom: ${theme.spacing.lg};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > label {
    color: ${theme.colors.gray700};
    font-size: 14px;
    font-weight: 600;
  }

  > input {
    width: 100%;
    border: 1px solid ${theme.colors.tealBorderSoft};
    border-radius: ${theme.radius.xl};
    padding: ${theme.spacing.md} 14px;
    font-size: 16px;
    color: ${theme.colors.gray800};
    transition: border-color .2s ease, box-shadow .2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.2);
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: 6px;
`

export const GoogleContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const Error = styled.div`
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 14px;
  margin-bottom: ${theme.spacing.lg};
`

export const Helper = styled.div`
  margin-top: 20px;
  text-align: center;
  color: ${theme.colors.gray650};

  > a {
    color: ${theme.colors.gray800};
    font-weight: 700;
    text-decoration: underline;
  }
`

export const ForgotPassword = styled.div`
  > a {
    display: block;
    text-align: right;
    font-size: 13px;
    color: ${theme.colors.gray650};
    text-decoration: underline !important;
    margin-top: -4px;

    &:hover {
      color: ${theme.colors.gray800};
    }
  }
`

export const Success = styled.div`
  background: ${theme.colors.successAlertTint};
  color: ${theme.colors.successAlertText};
  border: 1px solid ${theme.colors.successAlertBorder};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 14px;
  margin-bottom: ${theme.spacing.lg};
`
