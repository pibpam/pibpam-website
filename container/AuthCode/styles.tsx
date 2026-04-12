import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
  padding: 32px 24px 40px;

  h1 {
    font-size: 32px;
    font-weight: 600;
    color: #5fd9da;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > svg {
      font-size: 56px;
      color: #B5DA35;
    }

    p {
      font-size: 20px;
      color: #777;
    }
  }
`;
