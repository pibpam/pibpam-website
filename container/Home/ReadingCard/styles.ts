import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.radius.xl};
  background: linear-gradient(160deg, ${theme.colors.tealDark} 0%, ${theme.colors.tealMedium} 100%);
  color: ${theme.colors.white};
  text-align: left;
  cursor: pointer;
  box-shadow: ${theme.shadows.raised};
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.97);
  }

  > span:first-child {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.radius.md};
    background: rgba(255, 255, 255, 0.2);
    font-size: 20px;
  }
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  > small {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${theme.colors.tealLight};
  }

  > strong {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
  }

  > span {
    font-size: 13px;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.9);
  }
`
