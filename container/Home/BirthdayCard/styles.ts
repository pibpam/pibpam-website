import styled from 'styled-components'
import theme from '../../../styles/theme'
import { bounce, shineSweep } from '../highlight'

export const Container = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  overflow: hidden;
  border: none;
  border-radius: ${theme.radius.xl};
  background: linear-gradient(120deg, ${theme.colors.success} 0%, ${theme.colors.secondary} 55%, ${theme.colors.tealMedium} 100%);
  color: ${theme.colors.white};
  text-align: left;
  cursor: pointer;
  box-shadow: ${theme.shadows.raisedLime};
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }

  ${shineSweep}

  > svg:last-child {
    margin-left: auto;
    flex-shrink: 0;
    font-size: 18px;
  }
`

export const Icon = styled.span`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.circle};
  background: rgba(255, 255, 255, 0.28);
  font-size: 28px;
  animation: ${bounce} 1.8s ease-in-out infinite;
`

export const Text = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > strong {
    font-size: 16px;
    font-weight: 700;
  }

  > span {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
