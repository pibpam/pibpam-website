import styled from 'styled-components'
import theme from './theme'

export const Page = styled.main`
  min-height: 100vh;
  background: linear-gradient(180deg, ${theme.colors.white} 0%, ${theme.colors.tealTintLight} 55%, ${theme.colors.limeTint} 100%);
  padding: 0 0 ${theme.spacing.lg};
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: ${theme.spacing.base};
`

export const EventName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.md};
`

export const Summary = styled.div`
  border: 1px solid ${theme.colors.tealBorder};
  border-radius: ${theme.radius.xxl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.base};
  margin-bottom: ${theme.spacing.base};
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  font-size: 14px;
  color: ${theme.colors.gray700};
  padding: 6px 0;

  > *:first-child {
    flex-shrink: 0;
  }

  > *:last-child {
    min-width: 0;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.tealBorder};
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.md};
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.gray800};

  > *:last-child {
    min-width: 0;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const SectionLabel = styled.p`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${theme.colors.gray550};
  margin: 4px 0 8px;
`

export const Closed = styled.div`
  background: ${theme.colors.errorTint};
  color: ${theme.colors.errorText};
  border: 1px solid ${theme.colors.errorBorder};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};
  font-size: 14px;
  text-align: center;
  margin-top: ${theme.spacing.base};
`

export const PixCopy = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.white};
  color: ${theme.colors.tealDark};
  font-size: 13px;
  font-weight: 600;
  padding: ${theme.spacing.sm} ${theme.spacing.base};
  border-radius: ${theme.radius.pill};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${theme.colors.tealHover};
  }

  > svg {
    font-size: 15px;
  }
`
