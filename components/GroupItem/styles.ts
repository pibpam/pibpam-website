import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #5FD9DA;

  h1{
    color: #5FD9DA;
    font-size: 24px;
  }

  h2{
    color: #5FD9DA;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 24px;
  }

  > div {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    font-size: 18px;
    gap: 16px;
    color: #5FD9DA;

    >div:last-child {
      font-weight: 700;
    }
  }
`;
