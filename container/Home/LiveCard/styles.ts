import styled, { keyframes } from 'styled-components'
import theme from '../../../styles/theme'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`

export const Container = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  padding: ${theme.spacing.base};
  border: none;
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.tealDark};
  color: ${theme.colors.white};
  text-align: left;
  cursor: pointer;

  > svg:first-child {
    flex-shrink: 0;
    font-size: 36px;
    color: ${theme.colors.tealLight};
  }

  > svg:last-child {
    flex-shrink: 0;
    font-size: 20px;
  }
`

export const Text = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > strong {
    font-size: 17px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > span {
    font-size: 13px;
    color: ${theme.colors.tealLight};
  }
`

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.white};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: ${theme.radius.circle};
    background: ${theme.colors.errorStrong};
    animation: ${pulse} 1.4s ease-in-out infinite;
  }
`
