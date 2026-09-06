import styled from 'styled-components'
import theme from '../../../styles/theme'
import responsive from '../../../utils/responsive'

export const Container = styled.div`
  padding: ${theme.spacing.sm} 0 ${theme.spacing.xl};
  background: ${theme.colors.secondary};

  ${responsive.medium`
    > * {
      max-width: 1120px;
      margin-left: auto;
      margin-right: auto;
    }
  `}
`

export const Content = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.lg};
`

export const CardContainer = styled.div`
  width: 85vw;

  ${responsive.medium`
    width: 280px;
  `}
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

    color: ${theme.colors.white};

    > a {
      text-decoration: underline;
    }
  }
`
