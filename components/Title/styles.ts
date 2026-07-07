import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  padding: 0 0 0 ${theme.spacing.lg};

  &::after {
    content: "";
    display: flex;
    flex: 1;
    height: 1px;
    background: ${theme.colors.secondary};
  }

  > div {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${theme.colors.gray750};
  }
`
