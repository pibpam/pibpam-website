import React, { ReactNode } from 'react'

interface ISectionTitle {
  children: ReactNode
  id?: string
}

/** Título de seção das telas: barra lima à esquerda e respiro abaixo, antes do conteúdo. */
const SectionTitle: React.FC<ISectionTitle> = ({ children, id }) => (
  <h2
    id={id}
    className="mb-5 flex items-center gap-3 text-xl font-extrabold tracking-tight before:h-6 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
  >
    {children}
  </h2>
)

export default SectionTitle
