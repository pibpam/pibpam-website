import styled from 'styled-components'
import theme from '../../styles/theme'
import { bounce, shineSweep } from '../../styles/highlight'

// Mesmo destaque do card "Hoje tem aniversário!" da Home, em formato de linha.
export const Highlight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  overflow: hidden;
  border-radius: ${theme.radius.xl};
  background: ${theme.gradients.birthday};
  color: ${theme.colors.white};
  text-shadow: ${theme.shadows.onGradientText};
  box-shadow: ${theme.shadows.raisedLime};

  ${shineSweep}
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
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  > span {
    font-size: 17px;
    font-weight: 700;
  }
`
