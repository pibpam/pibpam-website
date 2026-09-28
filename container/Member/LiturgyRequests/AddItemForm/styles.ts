import styled from "styled-components";
import theme from "../../../../styles/theme";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  max-height: 75vh;
  overflow-y: auto;
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

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.gray700};
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.sm};
`;

export const TypeOption = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.md};
  border: 2px solid ${({ $active }) => ($active ? theme.colors.tealMedium : theme.colors.gray100)};
  background: ${({ $active }) => ($active ? theme.colors.tealHover : theme.colors.white)};
  color: ${({ $active }) => ($active ? theme.colors.tealDark : theme.colors.gray550)};
  font-size: 11px;
  font-weight: 600;

  svg {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  font-family: ${theme.fontFamily};
  font-size: 14px;
  color: ${theme.colors.gray700};

  &:focus {
    outline: none;
    border-color: ${theme.colors.tealMedium};
  }
`;

export const TextArea = styled.textarea`
  min-height: 72px;
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

export const FileButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md};
  border: 2px dashed ${theme.colors.gray225};
  border-radius: ${theme.radius.md};
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.tealDark};
  text-align: center;

  input {
    display: none;
  }
`;

export const FileName = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.gray550};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
