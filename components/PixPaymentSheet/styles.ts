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

export const Qr = styled.img`
  width: 220px;
  height: 220px;
  border: 1px solid ${theme.colors.tealBorder};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.base};
`

export const ManualBox = styled.div`
  width: 100%;
  background: ${theme.colors.tealTintLight};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.base};
  margin-bottom: ${theme.spacing.base};
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ManualLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${theme.colors.gray550};
`

export const ManualValue = styled.strong`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  word-break: break-all;
`

export const ManualName = styled.span`
  font-size: 13px;
  color: ${theme.colors.gray650};
`

export const CopyButton = styled.button`
  width: 100%;
  max-width: 320px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 15px;
  font-weight: 600;
  padding: ${theme.spacing.md} 20px;
  border-radius: ${theme.radius.pill};
  cursor: pointer;

  > svg {
    font-size: 18px;
  }
`

export const ProofSection = styled.div`
  width: 100%;
  max-width: 320px;
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
`

export const FileInput = styled.input`
  display: none;
`

export const ProofSuccess = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.successTint};
  color: ${theme.colors.successText};
  font-size: 14px;
  font-weight: 600;
  padding: 10px ${theme.spacing.base};
  border-radius: ${theme.radius.xl};

  > svg {
    font-size: 18px;
    flex-shrink: 0;
  }
`

export const ProofButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.white};
  color: ${theme.colors.tealDark};
  font-size: 15px;
  font-weight: 600;
  padding: 11px ${theme.spacing.base};
  border-radius: ${theme.radius.pill};
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.tealHover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  > svg {
    font-size: 18px;
  }
`

export const ProofError = styled.span`
  font-size: 13px;
  color: ${theme.colors.errorText};
`

const pixProofSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled(ImSpinner2)`
  animation: ${pixProofSpin} 0.6s linear infinite;
`
