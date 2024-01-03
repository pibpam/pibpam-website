import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  >div {
    display: flex;
    align-items: center;
    gap: 16px;
    overflow: hidden;

    > button {
      color: #B5DA35;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: 40px;
      font-size: 32px;
    }

    > div {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: #5FD9DA;

      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
