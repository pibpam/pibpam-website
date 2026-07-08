import styled, { css } from 'styled-components'
import theme from './theme'

export const CodeBox = styled.div`
  margin-top: ${theme.spacing.lg};
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
`

export const CodeLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${theme.colors.gray550};
`

export const CodeValue = styled.strong`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${theme.colors.gray800};
  word-break: break-all;
`

const trackBadgeVariants: Record<string, ReturnType<typeof css>> = {
  pending: css`
    background: ${theme.colors.warningTint};
    color: ${theme.colors.warningText};
  `,
  paid: css`
    background: ${theme.colors.successTint};
    color: ${theme.colors.successText};
  `,
  confirmed: css`
    background: ${theme.colors.successTint};
    color: ${theme.colors.successText};
  `,
  approved: css`
    background: ${theme.colors.successTint};
    color: ${theme.colors.successText};
  `,
  cancelled: css`
    background: ${theme.colors.errorTintStrong};
    color: ${theme.colors.error};
  `,
  canceled: css`
    background: ${theme.colors.errorTintStrong};
    color: ${theme.colors.error};
  `,
  expired: css`
    background: ${theme.colors.errorTintStrong};
    color: ${theme.colors.error};
  `,
  refunded: css`
    background: ${theme.colors.errorTintStrong};
    color: ${theme.colors.error};
  `,
}

export const TrackBadge = styled.span<{ $status?: string }>`
  display: inline-block;
  margin-top: 4px;
  padding: 3px ${theme.spacing.md};
  border-radius: ${theme.radius.xl};
  font-size: 12px;
  font-weight: 600;
  background: ${theme.colors.tealTint};
  color: ${theme.colors.gray700};

  ${({ $status }) => $status && trackBadgeVariants[$status]}
`

export const SuccessActions = styled.div`
  margin: ${theme.spacing.lg} 0;
  width: 100%;
`

export const CtaLink = styled.button`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.radius.pill};
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: ${theme.colors.white};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  > svg {
    font-size: 18px;
  }
`

export const TrackItem = styled.div<{ $clickable?: boolean }>`
  border: 1px solid ${theme.colors.tealBorder};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.md} 14px;
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      border-color: ${theme.colors.tealLight};
    }

    &:active {
      background: ${theme.colors.tealTintLight};
    }
  `}
`

export const TrackItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};

  > strong {
    min-width: 0;
    color: ${theme.colors.gray800};
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > span {
    flex-shrink: 0;
    color: ${theme.colors.success};
    font-weight: 600;
    font-size: 14px;
  }
`

export const TrackItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > strong {
    color: ${theme.colors.gray800};
    font-size: 15px;
  }
`

export const TrackMethodIcon = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.tealTint};
  color: ${theme.colors.gray550};
  flex-shrink: 0;

  > svg {
    font-size: 16px;
  }

  ${({ $active }) => $active && css`
    background: ${theme.colors.tealHover};
    color: ${theme.colors.tealDark};
  `}
`

export const TrackItemSub = styled.span`
  font-size: 13px;
  color: ${theme.colors.gray650};
`

export const TrackAddons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: 4px;
`

export const TrackAddon = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.sm} 10px;
  background: ${theme.colors.tealTintLight};
`

export const TrackAddonImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${theme.radius.md};
  object-fit: cover;
  flex-shrink: 0;
  background: ${theme.colors.tealTint};
`

// Usado no lugar de TrackAddonImg quando o item (adicional/produto) não tem imagem.
export const TrackAddonImgPlaceholder = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${theme.radius.md};
  flex-shrink: 0;
  background: ${theme.colors.tealTint};
  color: ${theme.colors.tealDark};

  > svg {
    font-size: 18px;
  }
`

export const TrackAddonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const TrackAddonName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray800};
  font-size: 13px;
`

export const TrackAddonDesc = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray650};
`

export const TrackProof = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.tealDark};
  text-decoration: underline;
  margin-top: 2px;
`
