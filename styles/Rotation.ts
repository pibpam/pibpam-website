import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
  padding: 0 24px 90px;
  display: flex;
  flex-direction: column;
  width: 100%;

  >p {
    color: #3D3D3D;
    margin-top: 8px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const MemberRotation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid ${theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  
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
    gap: 8px;

    > button {
      padding: 16px;
      display: flex;
      align-items: start;
      border-radius: 4px;
      flex-direction: column;
      gap: 8px;
      color: #3D3D3D;

      > div:first-child {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #3D3D3D;
      }

      > div:last-child {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-align: left;
        gap: 8px;
        color: #3D3D3D;

        > svg {
          min-width: 24px;
        }
      }
    }
  }
`

export const ModalOpen = styled.div`
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:first-child {
    margin-bottom: 24px;
    h1 {
      color: ${theme.colors.primary};
      font-size: 20px;
    }
    h2 {
      color: ${theme.colors.primary};
      margin-bottom: 16px;
      font-size: 24px;
    }
    p {
      color: #3D3D3D;
    }
  }
`;

export const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

 > div {
    & + div {
      border-top: 2px solid #eee;
    }
  }
`;

export const HeaderItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0px;

    > div:first-child {
      display: flex;
      flex-direction: column;

      > div:first-child {
        color: #3D3D3D;
        font-size: 20px;
      }

      > div:last-child {
        color: #3D3D3D;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .buttonsActions {
      display: flex;
      border: 2px solid ${theme.colors.primary};
      border-radius: 8px;
      overflow: hidden;

      > button {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        padding: 16px 8px;
        background: transparent;
        transition: ease .2s all;
        margin: 0;

        &.active {
          background: ${theme.colors.primary};
          color: #fff;
        }
        
        & + button {
          border-left:  2px solid ${theme.colors.primary};
        }
      }

      &.selected {
         border: 2px solid #ddd;

         > button {
          background: transparent;
          cursor: not-allowed;

          &.active {
            background: #ddd;
            color: #222;
          }

          & + button {
            border-left:  2px solid #ddd;
          }
        }
      }
    }
  `

export const MembersSelecteds = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    background: #eee;
    padding: 8px;
    border-radius: 8px;

    &.active {
      background: ${theme.colors.secundary};
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
  margin-top: 24px;

  > button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;
    justify-content: center;
    font-size: 20px;
    padding: 10px;
    background: ${theme.colors.primary};
    color: #fff;
    border-radius: 8px;
  }
`;

