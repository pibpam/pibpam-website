import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 700px;
  margin: 0 auto;

  > h1 {
    margin-bottom: ${theme.spacing.lg};
    font-size: 24px;
  }

  > h2 {
    margin-bottom: ${theme.spacing.sm};
    font-size: 16px;
  }

  > p {
    margin-bottom: ${theme.spacing.lg};
    text-align: justify;
  }
`
