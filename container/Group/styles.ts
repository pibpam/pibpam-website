import styled from "styled-components";

export const Container = styled.div`
  padding: 0 24px 32px;
`;

export const Grid = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 48px;
`;

export const ContainerModal = styled.div<{ bottom?: number }>`
  padding: 32px 0;
  padding-bottom: ${({ bottom }) => (bottom || 0) + 32}px;
`;

export const Description = styled.div`
  padding: 16px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: justify;
    color: #3d3d3d;
    margin-bottom: 24px;
  }
`;

export const Begin = styled.div`
  padding: 0 24px 24px;

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #3d3d3d;
  }

  > h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #3d3d3d;
    margin-bottom: 16px;
  }
`;

export const Location = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5fd9da;
  margin-bottom: 16px;
  align-items: center;

  > svg {
    margin-right: 8px;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;

    > button {
      text-decoration: underline;
      font-weight: 400;
      font-size: 12px;
      background: transparent;
      display: flex;
      margin-right: auto;
      padding: 4px 4px 4px 0;
      color: #5fd9da;

      &:focus,
      &:active {
        outline: none;
      }
    }
  }
`;
