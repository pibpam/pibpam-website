import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.xl};
`

export const Grid = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-direction: column;
  margin-bottom: 48px;
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
