import styled from 'styled-components'
import theme from '../../../styles/theme'
import responsive from '../../../utils/responsive'

export const Container = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

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
