import styled, { keyframes } from 'styled-components'
import { ImSpinner2 } from 'react-icons/im'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: relative;
  padding: ${theme.spacing.sm} 20px ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: ${theme.spacing.md};
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.radius.circle};
  background: ${theme.colors.tealTint};
  color: ${theme.colors.gray700};
  cursor: pointer;

  > svg {
    font-size: 18px;
  }
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.sm};
`

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray650};
  margin-bottom: ${theme.spacing.base};
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;

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
    background: ${theme.colors.white};
    text-transform: uppercase;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: ${theme.colors.gray350};
      text-transform: none;
    }

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.2);
    }
  }
`

export const Error = styled.div`
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 14px;
  text-align: left;
`

export const SubmitButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  padding: ${theme.spacing.md} 20px;
  border-radius: ${theme.radius.pill};
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  > svg {
    font-size: 18px;
  }
`

const checkRegistrationSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled(ImSpinner2)`
  animation: ${checkRegistrationSpin} 0.6s linear infinite;
`
