import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

export const Faqs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.base};
`

export const FaqItem = styled.div`
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  overflow: hidden;
`

export const FaqQuestion = styled.button<{ $open?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  border: none;
  background: none;
  padding: ${theme.spacing.md};
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: ${theme.colors.gray800};

  > svg {
    flex-shrink: 0;
    color: ${theme.colors.tealDark};
    transition: transform 0.25s ease;

    ${({ $open }) => $open && css`
      transform: rotate(180deg);
    `}
  }
`

// Truque com grid-template-rows (0fr/1fr) para animar a altura de um
// conteúdo de tamanho desconhecido — max-height exigiria um valor fixo.
export const FaqAnswerWrap = styled.div<{ $open?: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;
`

export const FaqAnswerInner = styled.div`
  overflow: hidden;
  min-height: 0;
`

export const FaqAnswer = styled.div`
  padding: 0 ${theme.spacing.md} ${theme.spacing.md};
  color: ${theme.colors.gray650};
  font-size: 13px;
  line-height: 1.6;

  p {
    margin-bottom: 8px;
  }

  a {
    color: ${theme.colors.tealDark};
    text-decoration: underline;
  }

  table {
    display: block;
    overflow-x: auto;
    width: 100%;
    margin-bottom: ${theme.spacing.sm};
    border-collapse: collapse;
    font-size: 12px;
  }

  th,
  td {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border: 1px solid ${theme.colors.tealBorderSoft};
    text-align: left;
    white-space: nowrap;
  }

  th {
    background: ${theme.colors.tealTint};
    color: ${theme.colors.gray800};
    font-weight: 600;
  }

  tr:nth-child(even) td {
    background: ${theme.colors.tealTintLight};
  }
`
