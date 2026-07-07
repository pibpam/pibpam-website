import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  padding: ${theme.spacing.sm} 0 calc(${theme.spacing.xl} + 90px);
  background: ${theme.colors.secondary};
`

export const CardContainer = styled.div`
  width: 85vw;
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

    color: ${theme.colors.white};

    > a {
      text-decoration: underline;
    }
  }
`
