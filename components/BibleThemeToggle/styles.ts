import styled from 'styled-components'
import theme from '../../styles/theme'

// Mesmo formato do botão de voltar do AppHeader, para o tom claro e o escuro.
export const Container = styled.button<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: -8px;
  padding: 0;
  border-radius: ${theme.radius.circle};
  background: none;
  font-size: 22px;
  color: ${({ $dark }) => ($dark ? theme.colors.primary : theme.colors.tealDark)};
  transition: background 0.2s ease;

  &:active {
    background: ${({ $dark }) => ($dark ? theme.colors.pineSoft : theme.colors.tealTint)};
  }
`
