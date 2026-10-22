import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  padding: 110px 24px 120px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  min-height: 100vh;
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};

  > h1 {
    font-size: 28px;
    color: ${theme.colors.gray700};
  }

  > p {
    font-size: 15px;
    color: ${theme.colors.gray650};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  > :first-child {
    grid-column: 1 / -1;
  }
`;
