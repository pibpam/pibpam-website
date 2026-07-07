import styled from 'styled-components'
import theme from './theme'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 120px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: ${theme.spacing.base};
    color: ${theme.colors.gray700};
  }
`

export const Item = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-weight: 700;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.gray225};

  > div:first-child {
    color: ${theme.colors.primary};
    width: 24px;
    text-align: center;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:last-child {
    text-align: left;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
`
