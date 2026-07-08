import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Responsibles = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.base};
`

export const ResponsibleCard = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  text-decoration: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.tealLight};
  }
`

export const ResponsibleIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.tealHover};
  color: ${theme.colors.tealDark};
  flex-shrink: 0;

  > svg {
    font-size: 18px;
  }
`

export const ResponsibleInfo = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const ResponsibleName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray800};
  font-size: 15px;
`

export const ResponsibleContact = styled.span`
  font-size: 13px;
  color: ${theme.colors.gray650};
`
