import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.base};

  > p {
    color: ${theme.colors.gray700};
    margin-top: ${theme.spacing.sm};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.sm};
`;

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  padding: ${theme.spacing.base};
  text-align: left;

  > div:first-child {
    color: #6a6a6a;
    font-size: 14px;
    border: 1px solid ${theme.colors.secondary};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 20px;
    margin-right: auto;
  }

  > div:nth-child(2) {
    color: ${theme.colors.gray700};
    font-size: 22px;
    font-weight: 600;
  }

  > div:last-child {
    color: ${theme.colors.gray700};
    font-size: 16px;
  }
`;

export const LessonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  padding: ${theme.spacing.base};

  > div:first-child {
    color: ${theme.colors.gray700};
    font-size: 14px;
  }

  > div:nth-child(2) {
    color: ${theme.colors.gray700};
    font-size: 20px;
    font-weight: 600;
  }

  > p {
    color: ${theme.colors.gray700};
    margin: 0;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.radius.md};
  font-size: 16px;
  padding: ${theme.spacing.md};
  font-weight: 700;

  &:disabled {
    opacity: 0.6;
  }
`;

export const ModalContent = styled.div<{ bottom?: number }>`
  padding: ${theme.spacing.lg};
  padding-bottom: ${({ bottom }) => (bottom ? bottom + 24 : 24)}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};

  > h1 {
    color: ${theme.colors.primary};
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: ${theme.colors.primary};
      font-size: 24px;
    }
  }

  > p {
    color: ${theme.colors.gray700};
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.radius.md};
    padding: ${theme.spacing.md};
    border: 2px solid #a1e56b;

    span {
      font-weight: 300;
      font-size: 14px;
    }
  }
`;

export const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const ParticipantItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding-top: ${theme.spacing.md};

  & + div {
    border-top: 2px solid ${theme.colors.gray100};
  }

  > div:first-child {
    color: ${theme.colors.gray700};
    font-size: 16px;
    font-weight: 600;
  }
`;

export const PresenceGroup = styled.div`
  display: flex;
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  overflow: hidden;

  > button {
    flex: 1;
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    background: transparent;
    color: ${theme.colors.gray700};
    font-size: 15px;
    font-weight: 600;
    gap: ${theme.spacing.xs};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

    &.active {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    }

    & + button {
      border-left: 2px solid ${theme.colors.primary};
    }
  }
`;
