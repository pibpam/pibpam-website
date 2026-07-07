import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'

export const PrimaryContainer = styled.button`
  color: ${theme.colors.gray800};
  background: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.radius.pill};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  justify-content: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`

export const SecondaryContainer = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  justify-content: center;
  border-radius: ${theme.radius.pill};

  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${theme.colors.white};
  background: ${theme.colors.primary};
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};

  > svg {
    font-size: 24px;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const ThirdContainer = styled.button<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  justify-content: center;
  border-radius: ${theme.radius.pill};

  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  text-align: center;
  color: ${theme.colors.gray700};
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};

  border: 1px solid ${theme.colors.secondary};
  background: none;

  > svg {
    font-size: 24px;
    ${({ $loading }) => $loading && css`animation: ${rotate} .5s linear infinite;`}
  }
`
