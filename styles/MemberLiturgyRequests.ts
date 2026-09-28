import styled from "styled-components";
import theme from "./theme";
import responsive from "../utils/responsive";

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.lg};

  ${responsive.medium`
    max-width: 960px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} 90px;
  `}
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} 0;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};

  p {
    margin: 0;
    font-size: 13px;
    color: ${theme.colors.gray550};
  }
`;

export const MyRequestsLink = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 6px ${theme.spacing.sm};
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.tealTint};
  color: ${theme.colors.tealDark};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;
