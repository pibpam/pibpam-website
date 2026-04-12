import styled from "styled-components";

export const Container = styled.div`
  padding: 110px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;

  > h1 {
    color: #3d3d3d;
  }

  > p {
    color: #3d3d3d;
  }
`;

export const SignOutButton = styled.button`
  font-size: 20px;
  margin: auto;
  text-decoration: underline;
  background: transparent;
  border: none;
  color: #3d3d3d;
`;

export const Alert = styled.div`
  background: #ffecec;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #f5aca6;

  > h1 {
    color: #d8000c;
    font-size: 20px;
  }

  > p {
    color: #3d3d3d;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    font-size: 16px;
    border: 2px solid #5fd9da;
    border-radius: 8px;
    background: transparent;
    color: #5fd9da;
    font-weight: 700;

    &:disabled {
      border-color: #c4c4c4;
      color: #c4c4c4;
    }

    > svg {
      font-size: 56px;
      margin-bottom: 8px;
    }
  }
`;
