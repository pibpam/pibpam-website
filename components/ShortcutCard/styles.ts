import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.button<{ $horizontal: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.base};
  border: 1px solid ${theme.colors.tealBorderCard};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  box-shadow: 0 2px 10px rgba(47, 111, 112, 0.08);
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.1s ease;

  &:active {
    transform: scale(0.98);
    background: ${theme.colors.tealHover};
    border-color: ${theme.colors.primary};
  }

  ${({ $horizontal }) => $horizontal && css`
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.base};
    border: 2px solid ${theme.colors.primary};
    background: ${theme.colors.tealTintLight};
  `}
`

export const Text = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > strong {
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.gray800};
  }

  > span {
    font-size: 12px;
    line-height: 1.3;
    color: ${theme.colors.gray650};
  }
`

export const Trailing = styled.span<{ $corner: boolean }>`
  display: inline-flex;
  font-size: 16px;
  color: ${theme.colors.tealDark};

  ${({ $corner }) => $corner && css`
    position: absolute;
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    font-size: 14px;
  `}
`
