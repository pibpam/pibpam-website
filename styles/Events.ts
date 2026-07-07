import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.xl};
`

export const ButtonOnLine = styled.div`
  margin-bottom: 48px;
`

export const Grid = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-direction: column;
  margin-bottom: 48px;
`

export const LoadMore = styled.div`
  margin-bottom: 90px;
`
