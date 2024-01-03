import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
  padding: 24px 24px 90px;
  display: flex;
  flex-direction: column;
  width: 100%;

  >p {
    color: #3D3D3D;
    margin-top: 32px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 32px;
/*   
  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #eee;
    border-radius: 8px;
    padding: 16px 8px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;

      > button {
        display: flex;
        align-items: center;
        background-color: #ddd;
        padding: 8px;
      }
    }
  } */
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

      > div:first-child {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      > div:last-child {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-align: left;
        gap: 8px;
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

  > div:last-child {

  }
`;

export const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0px;

    & + div {
      border-top: 2px solid #eee;
    }

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

      > div:last-child {
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

        &.active {
          background: ${theme.colors.primary};
          color: #fff;
        }
        
        & + button {
          border-left:  2px solid ${theme.colors.primary};
        }
      }
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

