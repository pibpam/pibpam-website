import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  width: 100%;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  border: 2px solid ${theme.colors.primary};
`

export const TagStatus = styled.div<{ $soldOut?: boolean }>`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${({ $soldOut }) => ($soldOut ? theme.colors.error : theme.colors.tealDark)};
  padding: 2px ${theme.spacing.sm};
  border: 1px solid ${({ $soldOut }) => ($soldOut ? theme.colors.errorBorderStrong : theme.colors.tealLight)};
  border-radius: ${theme.radius.xl};
  position: absolute;
  right: ${theme.spacing.base};
  top: ${theme.spacing.base};
  z-index: 3;
  background: rgba(255, 255, 255, 0.9);
`

export const Thumb = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
`

export const Content = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
  padding: ${theme.spacing.base};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 4px;

  > p:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: ${theme.colors.secondary};
  }
`

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  > span {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    gap: 6px;

    > svg {
      color: ${theme.colors.primary};
      flex-shrink: 0;
    }
  }
`

export const Backdrop = styled.div`
  background: url('/carrossel-min.png') center/cover;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 12, 35, 0.05) 0%,
      rgba(8, 12, 35, 0.15) 45%,
      rgba(8, 12, 35, 0.65) 100%
    );
  }
`

export const Footer = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.base};
  background: ${theme.colors.gray50};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`

const ctaNudge = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
`

export const Cta = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px ${theme.spacing.lg};
  border-radius: ${theme.radius.pill};
  border: none;
  cursor: pointer;

  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${theme.colors.gray800};
  background: ${theme.colors.secondary};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  > svg {
    font-size: 18px;
    animation: ${ctaNudge} 1.2s ease-in-out infinite;
  }

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
    color: ${theme.colors.white};
    background: ${theme.colors.disabled};

    > svg {
      animation: none;
    }
  `}
`

export const Price = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: ${theme.colors.gray800};
`

export const Spots = styled.span<{ $soldOut?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${({ $soldOut }) => ($soldOut ? theme.colors.error : theme.colors.success)};
`
