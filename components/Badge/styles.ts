import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export type BadgeVariant =
  | 'neutral'
  | 'muted'
  | 'warning'
  | 'success'
  | 'error'
  | 'primary'
  | 'soft'

const variants: Record<BadgeVariant, ReturnType<typeof css>> = {
  neutral: css`
    background: ${theme.colors.tealTint};
    color: ${theme.colors.gray700};
  `,
  muted: css`
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray550};
  `,
  warning: css`
    background: ${theme.colors.warningTint};
    color: ${theme.colors.warningText};
  `,
  success: css`
    background: ${theme.colors.successTint};
    color: ${theme.colors.successText};
  `,
  error: css`
    background: ${theme.colors.errorTintStrong};
    color: ${theme.colors.error};
  `,
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  soft: css`
    background: ${theme.colors.tealHover};
    color: ${theme.colors.tealDark};
  `,
}

export const Badge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${theme.radius.pill};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;

  ${({ $variant }) => variants[$variant]}
`
