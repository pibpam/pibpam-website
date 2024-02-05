import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #5FD9DA;

  button {
    margin: 0 0 auto auto;
    background: #5FD9DA;
    color: #fff;
    padding: 8px;
    border-radius: 16px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  h1{
    color: #5FD9DA;
    font-size: 24px;
  }

  h2{
    color: #5FD9DA;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  > div {
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: 16px;
    color: #5FD9DA;

    >div:last-child {
      font-weight: 700;
    }
  }
`;
