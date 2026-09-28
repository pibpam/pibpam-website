import styled from "styled-components";
import theme from "../../../../styles/theme";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
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

export const TextArea = styled.textarea`
  min-height: 96px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  font-family: ${theme.fontFamily};
  font-size: 14px;
  color: ${theme.colors.gray700};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.tealMedium};
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.errorText};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const SubmitButton = styled.button`
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.tealDark};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;

  &:disabled {
    background: ${theme.colors.disabled};
  }
`;

export const CancelButton = styled.button`
  padding: ${theme.spacing.sm};
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.gray550};
  text-align: center;
`;
