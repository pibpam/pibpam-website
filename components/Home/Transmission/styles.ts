import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
`

export const Content = styled.div`
  margin-top: ${theme.spacing.lg};
`

export const Live = styled.div`
  > ${Content} {
    margin-bottom: ${theme.spacing.lg};
  }

  &:after {
    content: "";
    height: 1px;
    width: 80%;
    display: block;
    background: ${theme.colors.secondary};
    margin: 40px auto 40px;
  }
`
