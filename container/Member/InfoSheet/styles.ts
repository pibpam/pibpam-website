import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  position: relative;
  padding: ${theme.spacing.sm} 20px ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: ${theme.spacing.md};
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.radius.circle};
  background: ${theme.colors.tealTint};
  color: ${theme.colors.gray700};
  cursor: pointer;

  > svg {
    font-size: 18px;
  }
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.base};
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
`

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};

  > svg {
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 20px;
    color: ${theme.colors.tealDark};
  }

  > p {
    font-size: 14px;
    line-height: 1.5;
    color: ${theme.colors.gray700};
  }
`
