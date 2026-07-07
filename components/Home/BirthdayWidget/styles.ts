import styled, { keyframes } from 'styled-components'
import { FiGift } from 'react-icons/fi'
import theme from '../../../styles/theme'

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const partyPulse = keyframes`
  0% {
    transform: scale(1) rotate(-6deg);
  }

  50% {
    transform: scale(1.12) rotate(6deg);
  }

  100% {
    transform: scale(1) rotate(-6deg);
  }
`

const borderPulse = keyframes`
  0% {
    opacity: 0.45;
    box-shadow: 0 0 0 0 rgba(181, 218, 53, 0.4);
  }

  70% {
    opacity: 0.8;
    box-shadow: 0 0 0 6px rgba(181, 218, 53, 0);
  }

  100% {
    opacity: 0.45;
    box-shadow: 0 0 0 0 rgba(181, 218, 53, 0);
  }
`

export const Widget = styled.button`
  appearance: none;
  cursor: pointer;
  border: 1px solid rgba(181, 218, 53, 0.45);
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.spacing.base};
  color: ${theme.colors.white};
  text-align: left;

  animation: forwards ${fadeInUp} 2s ease-in-out;

  background: linear-gradient(135deg,
      rgba(95, 217, 218, 0.32) 0%,
      rgba(181, 218, 53, 0.2) 100%);
  border-radius: ${theme.radius.sm};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.16);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.75);
    outline-offset: 2px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${theme.radius.sm};
    border: 1px solid rgba(181, 218, 53, 0.65);
    pointer-events: none;
    animation: ${borderPulse} 2s ease-in-out infinite;
  }
`

export const Badge = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  padding: 0;
  background: transparent;
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BadgeIcon = styled(FiGift)`
  font-size: 40px;
  animation: ${partyPulse} 1.2s ease-in-out infinite;
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 16px;
    font-weight: 500;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  h4 {
    font-size: 14px;
    font-weight: 600;
  }
`
