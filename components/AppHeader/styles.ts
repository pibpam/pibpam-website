import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.header<{ $dark: boolean; $glass?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 0 20px 12px;
  background: ${({ $dark, $glass }) =>
    $glass ? 'rgba(255, 255, 255, 0.82)' : $dark ? theme.colors.pine : theme.colors.white};
  backdrop-filter: ${({ $glass }) => ($glass ? 'blur(12px)' : 'none')};
  border-bottom: 1px solid
    ${({ $dark }) => ($dark ? theme.colors.lineInverse : theme.colors.tealBorder)};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  min-height: 40px;
`

export const Back = styled.button<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-left: -8px;
  padding: 0;
  border-radius: ${theme.radius.circle};
  background: none;
  font-size: 26px;
  color: ${({ $dark }) => ($dark ? theme.colors.primary : theme.colors.tealDark)};
  transition: background 0.2s ease;

  &:active {
    background: ${({ $dark }) => ($dark ? theme.colors.pineSoft : theme.colors.tealTint)};
  }
`

export const Title = styled.h1<{ $dark: boolean }>`
  flex: 1;
  min-width: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${({ $dark }) => ($dark ? theme.colors.inkInverse : theme.colors.gray900)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Logo = styled.button`
  display: flex;
  align-items: center;
  flex: 1;
  background: none;
  padding: 0;
`

export const Trailing = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
`
