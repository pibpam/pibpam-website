import styled from 'styled-components'
import theme from './theme'
import responsive from '../utils/responsive'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.base};

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} 90px;
  `}
`

export const Grid = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-direction: column;

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
  margin-top: ${theme.spacing.sm};
`
