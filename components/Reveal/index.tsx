import React, { ElementType, ReactNode } from 'react'

interface IReveal {
  children: ReactNode
  /** Posição na sequência: cada item entra um pouco depois do anterior. */
  index?: number
  as?: ElementType
  className?: string
}

const STEP_MS = 70
// Listas longas reiniciam a sequência, para os itens do fim não esperarem segundos.
const CYCLE = 8

/** Entrada com subida suave (animate-rise, a mesma do site), escalonada por `index`. */
const Reveal: React.FC<IReveal> = ({ children, index = 0, as: Tag = 'div', className = '' }) => (
  <Tag className={`animate-rise ${className}`} style={{ animationDelay: `${(index % CYCLE) * STEP_MS}ms` }}>
    {children}
  </Tag>
)

export default Reveal
