import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.base};
  border: 2px solid ${theme.colors.primary};

  button {
    margin: 0 0 auto auto;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.radius.xxl};
    display: flex;
    gap: 4px;
    align-items: center;
  }

  h1 {
    color: ${theme.colors.primary};
    font-size: 24px;
  }

  h2 {
    color: ${theme.colors.primary};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: ${theme.spacing.sm};
  }

  > div {
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: ${theme.spacing.base};
    color: ${theme.colors.primary};

    > div:last-child {
      font-weight: 700;
    }
  }
`;
