import styled from 'styled-components'
import theme from '../../styles/theme'

// Classes USFM do HTML da YouVersion. Cores pelas variáveis do tema (claro/escuro).
export const Container = styled.article`
  max-width: 700px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 32px;
  color: var(--ink);

  /* Parágrafos (p), sem recuo (m) e poesia (q1, q2) */
  .p,
  .m {
    margin-bottom: ${theme.spacing.md};
  }

  .q1,
  .q2 {
    padding-left: ${theme.spacing.base};
    text-indent: -${theme.spacing.base};
  }

  .q2 {
    padding-left: ${theme.spacing.xl};
  }

  .q2 + .p,
  .q1 + .p,
  .q2 + .m,
  .q1 + .m {
    margin-top: ${theme.spacing.md};
  }

  /* Subtítulos de seção (s1) e referências cruzadas (r) */
  .s1 {
    margin: ${theme.spacing.lg} 0 ${theme.spacing.sm};
    font-size: 16px;
    line-height: 24px;
    font-weight: 800;
  }

  .s1:first-child {
    margin-top: 0;
  }

  .r,
  .d {
    margin-bottom: ${theme.spacing.sm};
    font-size: 15px;
    line-height: 24px;
    font-style: italic;
    color: var(--ink-muted);
  }

  /* Rótulo do capítulo (cl): o título já está no cabeçalho */
  .cl {
    display: none;
  }

  /* Nome de Deus (nd): SENHOR em versalete */
  .nd {
    font-variant: small-caps;
  }

  .yv-vlbl {
    margin-right: ${theme.spacing.xs};
    vertical-align: super;
    font-size: 12px;
    line-height: 0;
    font-weight: 700;
    color: var(--brand-strong);
  }
`

export const Attribution = styled.p`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.base};
  border-top: 1px solid var(--line);
  font-size: 12px;
  line-height: 18px;
  white-space: pre-line;
  color: var(--ink-muted);
`
