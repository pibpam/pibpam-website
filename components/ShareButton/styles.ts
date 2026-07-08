import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.button<{ $large?: boolean }>`
  padding: 4px ${theme.spacing.base};
  border-radius: ${theme.radius.xxl};
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${theme.colors.primary};
  font-weight: 600;

  font-size: 16px;
  margin-top: ${theme.spacing.base};

  ${({ $large }) => $large && css`
    width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border-radius: ${theme.radius.pill};
    font-size: 18px;
    gap: 10px;

    > svg {
      font-size: 20px;
    }
  `}
`
