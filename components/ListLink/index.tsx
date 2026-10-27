import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

interface IListLink {
  label: string
  /** Texto destacado antes do rótulo (ex.: número do hino). */
  prefix?: string | number
  onClick: () => void
}

/** Linha de lista que leva a outra tela (livros da Bíblia, hinos…). */
const ListLink: React.FC<IListLink> = ({ label, prefix, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex min-h-14 w-full items-center gap-3 rounded-md border border-line bg-paper px-4 shadow-sm py-3 text-left font-semibold text-ink transition-colors active:bg-brand-soft"
  >
    {prefix !== undefined && (
      <span className="min-w-8 text-brand-strong tabular-nums">{prefix}</span>
    )}
    <span className="min-w-0 flex-1 text-balance">{label}</span>
    <FiChevronRight aria-hidden className="shrink-0 text-xl text-brand-strong" />
  </button>
)

export default ListLink
