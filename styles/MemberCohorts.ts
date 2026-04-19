import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
  padding: 0 24px 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  > p {
    color: #3d3d3d;
    margin-top: 8px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  background: #fff;
  padding: 16px;
  text-align: left;

  > div:first-child {
    color: #6a6a6a;
    font-size: 14px;
    border: 1px solid ${theme.colors.secundary};
    padding: 4px 8px;
    border-radius: 20px;
    margin-right: auto;
  }

  > div:nth-child(2) {
    color: #3d3d3d;
    font-size: 22px;
    font-weight: 600;
  }

  > div:last-child {
    color: #3d3d3d;
    font-size: 16px;
  }
`;

export const LessonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  background: #fff;
  padding: 16px;

  > div:first-child {
    color: #3d3d3d;
    font-size: 14px;
  }

  > div:nth-child(2) {
    color: #3d3d3d;
    font-size: 20px;
    font-weight: 600;
  }

  > p {
    color: #3d3d3d;
    margin: 0;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: ${theme.colors.primary};
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  padding: 12px;
  font-weight: 700;

  &:disabled {
    opacity: 0.6;
  }
`;

export const ModalContent = styled.div<{ bottom?: number }>`
  padding: 24px;
  padding-bottom: ${({ bottom }) => (bottom ? bottom + 24 : 24)}px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > h1 {
    color: ${theme.colors.primary};
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 8px;

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
    color: #3d3d3d;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 12px;
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
  gap: 12px;
`;

export const ParticipantItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;

  & + div {
    border-top: 2px solid #eee;
  }

  > div:first-child {
    color: #3d3d3d;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const PresenceGroup = styled.div`
  display: flex;
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;

  > button {
    flex: 1;
    padding: 12px 8px;
    background: transparent;
    color: #3d3d3d;
    font-size: 15px;
    font-weight: 600;
    gap: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

    &.active {
      background: ${theme.colors.primary};
      color: #fff;
    }

    & + button {
      border-left: 2px solid ${theme.colors.primary};
    }
  }
`;
