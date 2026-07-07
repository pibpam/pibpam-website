import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  padding: 0 ${theme.spacing.lg} 90px;
  margin-top: ${theme.spacing.base};
`
