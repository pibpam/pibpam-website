import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export type ShortcutCardSize = 'default' | 'compact' | 'wide'
export type ShortcutCardTone = 'default' | 'tint' | 'lime'

const tones: Record<ShortcutCardTone, ReturnType<typeof css>> = {
  default: css`
    background: ${theme.colors.white};
    border-color: ${theme.colors.tealBorderCard};
  `,
  tint: css`
    background: ${theme.colors.tealTintLight};
    border-color: ${theme.colors.tealBorderSoft};
  `,
  lime: css`
    background: ${theme.colors.limeTint};
    border-color: ${theme.colors.limeTint};

    > span:first-child {
      background: ${theme.colors.white};
      color: ${theme.colors.success};
    }

    strong {
      color: ${theme.colors.successText};
    }
  `,
}

const sizes: Record<ShortcutCardSize, ReturnType<typeof css>> = {
  default: css`
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.md};
  `,
  compact: css`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.sm};
    text-align: center;
  `,
  wide: css`
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md} ${theme.spacing.base};
  `,
}

export const Container = styled.button<{
  $size: ShortcutCardSize
  $tone: ShortcutCardTone
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid transparent;
  border-radius: ${theme.radius.xl};
  box-shadow: ${theme.shadows.card};
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.1s ease;

  ${({ $size }) => sizes[$size]}
  ${({ $tone }) => tones[$tone]}

  &:active {
    transform: scale(0.97);
  }
`

export const Text = styled.div<{ $size: ShortcutCardSize }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  ${({ $size }) => $size === 'wide' && css`
    flex: 1;
  `}

  > strong {
    font-size: ${({ $size }) => ($size === 'compact' ? '12px' : '15px')};
    font-weight: 700;
    line-height: 1.15;
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
