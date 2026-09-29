import styled from "styled-components";
import theme from "../../../styles/theme";

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

export const EmptyPlanNote = styled.p`
  margin: 0;
  padding: ${theme.spacing.base};
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.gray550};
`;

export const GroupLabel = styled.h2`
  margin: ${theme.spacing.base} 0 0;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${theme.colors.gray550};

  &:first-child {
    margin-top: 0;
  }
`;

export const GroupEmptyNote = styled.p`
  margin: 0;
  padding: ${theme.spacing.base};
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.gray550};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
`;
