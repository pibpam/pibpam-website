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

export const MemberRotation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  border: 2px solid ${theme.colors.primary};
  padding: ${theme.spacing.base};
  border-radius: ${theme.radius.md};

  > div:first-child {
    display: flex;
    flex-direction: column;

    > div:first-child {
      font-size: 16px;
    }

    > div:last-child {
      font-size: 24px;
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};

    > button {
      padding: ${theme.spacing.base};
      display: flex;
      align-items: start;
      border-radius: ${theme.radius.sm};
      flex-direction: column;
      gap: ${theme.spacing.sm};
      color: ${theme.colors.gray700};

      > div:first-child {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: ${theme.colors.gray700};
      }

      > div:last-child {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-align: left;
        gap: ${theme.spacing.sm};
        color: ${theme.colors.gray700};

        > svg {
          min-width: 24px;
        }
      }
    }
  }
`;

export const ModalOpen = styled.div<{ bottom?: number }>`
  padding: ${theme.spacing.lg} ${theme.spacing.lg};
  padding-bottom: ${({ bottom }) => (bottom ? bottom + 24 : 24)}px;
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:first-child {
    margin-bottom: ${theme.spacing.lg};
    h1 {
      color: ${theme.colors.primary};
      font-size: 20px;
    }
    h2 {
      color: ${theme.colors.primary};
      margin-bottom: ${theme.spacing.base};
      font-size: 24px;
    }
    p {
      color: ${theme.colors.gray700};
    }
  }
`;

export const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  > div {
    & + div {
      border-top: 2px solid ${theme.colors.gray100};
    }
  }
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.base} 0px;

  > div:first-child {
    display: flex;
    flex-direction: column;

    > div:first-child {
      color: ${theme.colors.gray700};
      font-size: 20px;
    }

    > div:last-child {
      color: ${theme.colors.gray700};
      font-size: 16px;
      font-weight: bold;
    }
  }

  .buttonsActions {
    display: flex;
    border: 2px solid ${theme.colors.primary};
    border-radius: ${theme.radius.md};
    overflow: hidden;

    > button {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.xs};
      font-size: 16px;
      padding: ${theme.spacing.base} ${theme.spacing.sm};
      background: transparent;
      transition: ease 0.2s all;
      margin: 0;

      &.active {
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
      }

      & + button {
        border-left: 2px solid ${theme.colors.primary};
      }
    }

    &.selected {
      border: 2px solid ${theme.colors.gray225};

      > button {
        background: transparent;
        cursor: not-allowed;

        &.active {
          background: ${theme.colors.gray225};
          color: ${theme.colors.gray900};
        }

        & + button {
          border-left: 2px solid ${theme.colors.gray225};
        }
      }
    }
  }
`;

export const MembersSelecteds = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    background: ${theme.colors.gray100};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.radius.md};

    &.active {
      background: ${theme.colors.secondary};
    }

    > div:first-child {
      font-weight: 400;
      font-size: 12px;
    }

    > div:last-child {
      font-weight: 600;
      font-size: 18px;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      overflow: hidden;
    }
  }
`;

export const ButtonSave = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing.lg};

  > button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: ${theme.spacing.sm};
    justify-content: center;
    font-size: 20px;
    padding: 10px;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-radius: ${theme.radius.md};
  }
`;
