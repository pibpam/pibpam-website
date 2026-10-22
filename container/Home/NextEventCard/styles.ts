import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'
import { bounce, shineSweep } from '../highlight'

export const Container = styled.button<{ $active: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.tealBorderCard};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  box-shadow: 0 2px 10px rgba(47, 111, 112, 0.08);
  text-align: left;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.97);
  }

  ${({ $active }) => $active && css`
    border-color: transparent;
    background: linear-gradient(150deg, ${theme.colors.success} 0%, ${theme.colors.secondary} 55%, ${theme.colors.tealMedium} 100%);
    box-shadow: 0 6px 18px rgba(110, 143, 10, 0.3);
    ${shineSweep}
  `}
`

export const Label = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.tealDark)};
`

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

// "Folha de calendário": mês em faixa colorida e o dia grande embaixo.
export const Calendar = styled.span<{ $active: boolean }>`
  flex-shrink: 0;
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.white};
  box-shadow: 0 2px 8px rgba(47, 111, 112, 0.18);

  > small {
    width: 100%;
    padding: 2px 0;
    background: ${({ $active }) => ($active ? theme.colors.success : theme.colors.tealDark)};
    color: ${theme.colors.white};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }

  > strong {
    padding: 2px 0 4px;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.1;
    color: ${({ $active }) => ($active ? theme.colors.successText : theme.colors.tealDark)};
  }

  ${({ $active }) => $active && css`
    animation: ${bounce} 1.8s ease-in-out infinite;
  `}
`

export const When = styled.span<{ $active: boolean }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.gray650)};

  > strong {
    font-size: 13px;
    font-weight: 700;
    color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.gray800)};
  }

  > span {
    font-size: 13px;
    font-weight: 600;
  }
`

export const Title = styled.span<{ $active: boolean }>`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.gray800)};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
