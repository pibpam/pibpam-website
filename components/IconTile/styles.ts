import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export type IconTileVariant = 'neutral' | 'soft' | 'solid' | 'muted'

const variants: Record<IconTileVariant, ReturnType<typeof css>> = {
  neutral: css`
    background: ${theme.colors.tealTint};
    color: ${theme.colors.gray550};
  `,
  soft: css`
    background: ${theme.colors.tealHover};
    color: ${theme.colors.tealDark};
  `,
  solid: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  muted: css`
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray400};
  `,
}

export const IconTile = styled.span<{ $variant: IconTileVariant; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${theme.radius.md};
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  ${({ $variant }) => variants[$variant]}

  > svg {
    font-size: ${({ $size }) => Math.round($size * 0.5)}px;
  }
`
