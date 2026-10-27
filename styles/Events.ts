import styled from 'styled-components'
import theme from './theme'
import responsive from '../utils/responsive'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.xl};

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
  `}
`

export const Grid = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-direction: column;
  margin-bottom: 48px;

  ${responsive.medium`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.base};
  `}

  ${responsive.large`
    grid-template-columns: repeat(3, 1fr);
  `}
`

export const LoadMore = styled.div`
  margin-bottom: 90px;
`
