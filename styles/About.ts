import styled from 'styled-components'
import theme from './theme'
import responsive from '../utils/responsive'

export const Description = styled.div`
  margin-bottom: ${theme.spacing.xl};
`

export const PageContent = styled.div`
  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
  `}
`
