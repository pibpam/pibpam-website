import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  padding: 0 ${theme.spacing.lg};
  margin-top: ${theme.spacing.base};
  margin-bottom: 72px;
`

export const SeeAllButton = styled.button`
  background: none;
  text-decoration: underline;
  color: ${theme.colors.primary};
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 16px;
  padding: 4px 0 4px 4px;
`
