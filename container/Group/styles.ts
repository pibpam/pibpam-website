import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 24px 32px;
`;

export const Grid = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 48px;
`;

export const ContainerModal = styled.div`
  padding: 32px 0;
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
    color: #3D3D3D;
    margin-bottom: 24px;
  }
`;

export const Begin = styled.div`
  padding: 0 24px 24px;

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #3D3D3D;
  }

  > h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #3D3D3D;
    margin-bottom: 16px;
  }
`;
