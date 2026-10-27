import { css, keyframes } from 'styled-components'

// Animações de destaque (aniversário, ao vivo, evento de hoje): cards da Home e aniversariantes.

export const bounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-4px) rotate(6deg); }
`

const shine = keyframes`
  0% { transform: translateX(-120%); }
  60%, 100% { transform: translateX(220%); }
`

// Brilho que atravessa o card de tempos em tempos. O card precisa de position: relative
// e overflow: hidden.
export const shineSweep = css`
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    animation: ${shine} 4s ease-in-out infinite;
    pointer-events: none;
  }
`
