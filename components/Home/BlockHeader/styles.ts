import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  color: ${theme.colors.gray750};

  > svg {
    font-size: 68px;
    color: ${theme.colors.secondary};
    stroke-width: 1px;
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    max-width: 226px;
  }
`
