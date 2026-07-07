import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

export const Item = styled.div`
  width: calc(100vw - (2 * ${theme.spacing.lg}));
  background: ${theme.colors.gray400};
  aspect-ratio: 16/9;
`

export const Container = styled.div`
  width: calc(100vw - (2 * ${theme.spacing.lg}));
  border-radius: ${theme.radius.sm};
  overflow: hidden;
`

const widthAnimation = keyframes`
  from {
    width: 0;
    opacity: .7;
  }

  to {
    width: 100%;
    opacity: 1;
  }
`

export const Stepper = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.base} 0 0;
`

export const StepTrack = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, .5);
  border-radius: ${theme.radius.sm};
  overflow: hidden;
`

export const StepFill = styled.div<{ $active?: boolean }>`
  height: 100%;
  background: ${theme.colors.white};
  width: 0;

  ${({ $active }) => $active && css`
    animation: ${widthAnimation} 10s ease-out;
  `}
`
