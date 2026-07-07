import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  overflow: hidden;
  justify-content: space-between;
`

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};

  > svg {
    font-size: 40px;
    color: rgba(255, 255, 255, 0.69);
  }

  > div {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.white};
  }
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray600};
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.colors.secondary};
  width: 140px;
  min-width: 140px;
  justify-content: center;
  padding: ${theme.spacing.base};
  gap: ${theme.spacing.sm};

  > span {
    display: flex;
    gap: 4px;
    align-items: center;

    > svg {
      font-size: 16px;
    }
  }
`
