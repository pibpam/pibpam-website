import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
`

export const Container = styled.div<{ $closing?: boolean; $bottom: number }>`
  position: fixed;
  left: 50%;
  bottom: ${({ $bottom }) => $bottom}px;
  z-index: 20;
  width: calc(100% - 32px);
  max-width: 420px;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: ${slideUp} 0.25s ease-out forwards;

  ${({ $closing }) => $closing && css`
    animation: ${slideDown} 0.2s ease-in forwards;
  `}
`

export const Icon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-top: 1px;

  > svg {
    font-size: 18px;
  }
`

export const Message = styled.span`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-top: 1px;
  color: ${theme.colors.errorText};
  cursor: pointer;
  flex-shrink: 0;
  display: inline-flex;

  > svg {
    font-size: 18px;
  }
`
