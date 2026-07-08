import styled, { keyframes } from 'styled-components';
import theme from '../../styles/theme';

export const BlockClick = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const DesktopOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

export const DesktopDialog = styled.div`
  position: relative;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.dialog};
  width: 90%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing.lg} 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: ${scaleIn} 0.2s ease;
`;

export const DesktopCloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
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
  z-index: 1;

  > svg {
    font-size: 18px;
  }
`;
