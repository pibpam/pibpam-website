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

export const Header = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  flex-direction: column;

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      color: ${theme.colors.primary};
    }
  }
`
