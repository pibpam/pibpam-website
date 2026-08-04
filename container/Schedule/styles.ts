import styled from "styled-components";
import theme from "../../styles/theme";
import responsive from "../../utils/responsive";

export const Container = styled.div`
  padding: 0 24px 90px;

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} 90px;
  `}
`;

export const Content = styled.div`
  padding: 32px 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 32px ${theme.spacing.xl} 48px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  `}

  ${responsive.large`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 32px 0 40px;
  grid-gap: 8px;

  > div {
    width: 100%;
  }

  ${responsive.medium`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${responsive.large`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

export const ContainerModal = styled.div<{ bottom?: number }>`
  padding: 32px 0 0;
  padding-bottom: ${({ bottom }) => bottom || 0}px;
`;
