import styled from "styled-components";
import theme from "../../../../styles/theme";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const RequestCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.base};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
`;

export const RequestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`;

export const RequestType = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.gray700};

  svg {
    color: ${theme.colors.tealDark};
  }
`;

export const RequestMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.gray550};
`;

export const RequestComment = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${theme.colors.gray700};
`;

export const ReviewNote = styled.p`
  margin: 0;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  background: ${theme.colors.gray50};
  font-size: 12px;
  color: ${theme.colors.gray650};
`;
