import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  padding: ${theme.spacing.xl} 0 calc(${theme.spacing.xl} + 90px);
`

export const Content = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.lg};
`

export const CarousselControlls = styled.div`
  margin: ${theme.spacing.xl} 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex: 1;

  > p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    max-width: 260px;

    color: ${theme.colors.gray400};

    > a {
      text-decoration: underline;
    }
  }
`
