import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

const variants = {
  success: css`
    background: ${theme.colors.successAlertTint};
    color: ${theme.colors.successAlertText};
    border-color: ${theme.colors.successAlertBorder};
  `,
  failure: css`
    background: ${theme.colors.errorTint};
    color: ${theme.colors.errorText};
    border-color: ${theme.colors.errorBorder};
  `,
}

export const Container = styled.div<{ $status: 'success' | 'failure' }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  border: 1px solid;
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};
  margin-top: ${theme.spacing.base};

  ${({ $status }) => variants[$status]}
`

export const Icon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-top: 1px;

  > svg {
    font-size: 22px;
  }
`

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: ${theme.spacing.lg};
`

export const Title = styled.strong`
  display: block;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 2px;
`

export const Message = styled.p`
  font-size: 13px;
  line-height: 1.4;
`

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: none;
  border: none;
  padding: 4px;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  display: inline-flex;

  &:hover {
    opacity: 1;
  }

  > svg {
    font-size: 16px;
  }
`
