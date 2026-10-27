import React from 'react'
import { Attribution, Container } from './styles'

interface IBibleText {
  /** HTML do capítulo como a YouVersion entrega (services/youversion.ts). */
  html: string
  /** Atribuição exigida pela licença da versão. */
  copyright?: string | null
}

/** Texto de um capítulo da Bíblia, com subtítulos, poesia e números de versículo. */
const BibleText: React.FC<IBibleText> = ({ html, copyright }) => (
  <Container>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    {copyright && <Attribution>{copyright}</Attribution>}
  </Container>
)

export default BibleText
