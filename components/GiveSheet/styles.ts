import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: relative;
  padding: ${theme.spacing.sm} 20px ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
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

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding-right: 40px;

  > h2 {
    font-size: 22px;
    font-weight: 800;
    color: ${theme.colors.gray800};
  }

  > p {
    font-size: 14px;
    line-height: 1.5;
    color: ${theme.colors.gray650};
  }
`

export const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.base};
  background: ${theme.colors.tealTintLight};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xxl};

  > h3 {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.gray800};

    > svg {
      font-size: 20px;
      color: ${theme.colors.tealDark};
    }
  }

  > p {
    font-size: 14px;
    line-height: 1.5;
    color: ${theme.colors.gray650};
  }
`

export const Details = styled.dl`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  dt {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${theme.colors.gray550};
  }

  dd {
    margin: 0;
    font-size: 15px;
    color: ${theme.colors.gray800};
  }

  dd[data-key] {
    font-size: 18px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

export const CopyButton = styled.button<{ $copied: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  min-height: 44px;
  padding: 0 20px;
  border-radius: ${theme.radius.pill};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  border: 1px solid
    ${({ $copied }) => ($copied ? theme.colors.success : theme.colors.tealDark)};
  background: ${({ $copied }) =>
    $copied ? theme.colors.success : theme.colors.white};
  color: ${({ $copied }) =>
    $copied ? theme.colors.white : theme.colors.tealDark};

  > svg {
    font-size: 18px;
  }
`

export const Notice = styled.p`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.base};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.limeTint};
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.colors.gray800};

  > svg {
    flex-shrink: 0;
    margin-top: 2px;
    font-size: 18px;
    color: ${theme.colors.successText};
  }
`
