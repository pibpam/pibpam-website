import styled from "styled-components";

export const Container = styled.div`
 padding: 0 24px 90px;
`;

export const Content = styled.div`
  padding: 32px 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 32px 0 40px;
  grid-gap: 8px;

  > div {
    width: 100%;
  }
`;

export const ContainerModal = styled.div`
  padding: 32px 0 80px;
`;
