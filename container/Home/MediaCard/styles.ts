import styled, { css, keyframes } from 'styled-components'
import theme from '../../../styles/theme'
import { bounce, shineSweep } from '../highlight'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`

const ring = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.7);
    opacity: 0;
  }
`

export const Container = styled.button<{ $live: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.base};
  overflow: hidden;
  border: none;
  border-radius: ${theme.radius.xxl};
  background-color: ${theme.colors.tealDark};
  background-size: cover;
  background-position: center;
  color: ${theme.colors.white};
  text-align: left;
  cursor: pointer;
  box-shadow: ${theme.shadows.raised};
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }

  /* Máscara escura sobre a imagem: as capas têm texto próprio e brigam com o título. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(8, 12, 35, 0.8) 0%, rgba(8, 12, 35, 0.86) 50%, rgba(8, 12, 35, 0.95) 100%);
  }

  > * {
    position: relative;
  }

  ${({ $live }) => $live && css`
    box-shadow: 0 0 0 2px ${theme.colors.errorStrong}, 0 8px 24px rgba(255, 0, 0, 0.25);
    ${shineSweep}
  `}
`

export const Badge = styled.span<{ $live: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px ${theme.spacing.sm};
  border-radius: ${theme.radius.pill};
  background: ${({ $live }) => ($live ? theme.colors.errorStrong : 'rgba(255, 255, 255, 0.22)')};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  ${({ $live }) => $live && css`
    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: ${theme.radius.circle};
      background: ${theme.colors.white};
      animation: ${pulse} 1.2s ease-in-out infinite;
    }
  `}
`

export const Title = styled.strong`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.15;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Subtitle = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
`

export const Play = styled.span<{ $live: boolean }>`
  position: absolute !important;
  top: ${theme.spacing.base};
  right: ${theme.spacing.base};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.circle};
  background: rgba(255, 255, 255, 0.92);
  color: ${theme.colors.tealDark};
  font-size: 22px;

  ${({ $live }) => $live && css`
    color: ${theme.colors.errorStrong};
    animation: ${bounce} 1.8s ease-in-out infinite;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: ${theme.radius.circle};
      border: 2px solid ${theme.colors.white};
      animation: ${ring} 1.6s ease-out infinite;
    }
  `}
`
