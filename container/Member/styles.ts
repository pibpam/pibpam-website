import styled from "styled-components";
import responsive from "../../utils/responsive";
import theme from "../../styles/theme";

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

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 110px 32px 24px;
    width: 100%;
  `}
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
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  background: ${theme.colors.warningTint};
  color: ${theme.colors.warningText};
  border: 1px solid ${theme.colors.warningBorder};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};

  > svg {
    flex-shrink: 0;
    font-size: 20px;
    margin-top: 1px;
  }
`;

export const AlertContent = styled.div`
  flex: 1;
  min-width: 0;

  > strong {
    display: block;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  > p {
    font-size: 13px;
    line-height: 1.4;
  }
`;

export const AlertLink = styled.button`
  display: inline;
  margin-top: 4px;
  border: none;
  background: transparent;
  padding: 0;
  font-size: 13px;
  font-weight: 700;
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: ${theme.spacing.xl} 0;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Card = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  padding: ${theme.spacing.base};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.tealTintLight};
  cursor: pointer;
  text-align: left;

  > svg:first-child {
    flex-shrink: 0;
    font-size: 36px;
    color: ${theme.colors.tealDark};
  }

  > svg:last-child {
    flex-shrink: 0;
    font-size: 20px;
    color: ${theme.colors.tealDark};
  }

  &:disabled {
    cursor: default;
    border-color: ${theme.colors.gray200};
    background: ${theme.colors.gray50};

    > svg:first-child,
    > svg:last-child {
      color: ${theme.colors.gray400};
    }

    > div > strong {
      color: ${theme.colors.gray400};
    }
  }
`;

export const CardText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > strong {
    font-size: 17px;
    color: ${theme.colors.gray800};
  }

  > span {
    font-size: 13px;
    color: ${theme.colors.gray650};
  }
`;
