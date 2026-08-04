import styled, { keyframes } from 'styled-components'
import { ImSpinner2 } from 'react-icons/im'
import theme from '../../../styles/theme'

export const Container = styled.section`
  margin-bottom: ${theme.spacing.xl};
`

export const Form = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.pill};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  font-size: 15px;
  color: ${theme.colors.gray800};
  background: ${theme.colors.white};

  &::placeholder {
    color: ${theme.colors.gray350};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

export const SubmitButton = styled.button`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.radius.circle};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  > svg {
    font-size: 18px;
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled(ImSpinner2)`
  animation: ${spin} 0.6s linear infinite;
`

export const Error = styled.div`
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.lg};
  padding: 10px ${theme.spacing.md};
  font-size: 14px;
  margin-bottom: ${theme.spacing.sm};
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

export const Item = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.tealBorder};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.md} 14px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.tealLight};
  }
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const ItemEvent = styled.strong`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > span {
    font-weight: 400;
    color: ${theme.colors.gray650};
  }
`

export const ItemCode = styled.span`
  font-size: 13px;
  letter-spacing: 0.04em;
  color: ${theme.colors.gray650};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemName = styled.span`
  font-size: 13px;
  color: ${theme.colors.gray650};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  text-align: center;
  padding: ${theme.spacing.lg} 0;

  > svg {
    font-size: 28px;
    color: ${theme.colors.gray350};
  }

  > span {
    font-size: 14px;
    color: ${theme.colors.gray550};
  }
`
