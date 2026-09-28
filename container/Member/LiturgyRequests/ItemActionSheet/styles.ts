import styled from "styled-components";
import theme from "../../../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.xl};
`;

export const TargetSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  span:first-child {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: ${theme.radius.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tealTintLight};
    color: ${theme.colors.tealDark};
    font-size: 18px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.gray700};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${theme.colors.gray550};
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.base};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray700};
  text-align: left;

  svg {
    flex-shrink: 0;
    font-size: 18px;
    color: ${theme.colors.tealDark};
  }
`;

export const CancelButton = styled.button`
  padding: ${theme.spacing.sm};
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.gray550};
  text-align: center;
`;
