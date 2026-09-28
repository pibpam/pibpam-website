import styled, { css } from "styled-components";
import theme from "../../../styles/theme";

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm} ${theme.spacing.base} ${theme.spacing.base};
`;

export const InsertPoint = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 4px 0;
  color: ${theme.colors.gray400};
  font-size: 11px;
  opacity: 0;
  transition: opacity 0.15s ease, color 0.15s ease;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${theme.colors.tealBorder};
  }

  &:hover,
  &:focus-visible {
    opacity: 1;
    color: ${theme.colors.tealDark};

    &::before,
    &::after {
      background: ${theme.colors.tealMedium};
    }
  }

  /* Sempre visível em telas de toque — não há hover pra revelar. */
  @media (hover: none) {
    opacity: 1;
  }
`;

export const ItemRow = styled.div<{ $hidden?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} 0;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0.55;
    `}
`;

export const ItemOrdinal = styled.span`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: ${theme.radius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray550};
  font-size: 11px;
  font-weight: 700;
`;

export const ItemIcon = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: ${theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.tealTintLight};
  color: ${theme.colors.tealDark};
  font-size: 16px;
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const ItemName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray700};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemMeta = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray550};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemActionButton = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: ${theme.radius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray550};
  font-size: 18px;

  &:active {
    background: ${theme.colors.gray100};
  }
`;

export const EmptyPlanNote = styled.p`
  margin: 0;
  padding: ${theme.spacing.base};
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.gray550};
`;
