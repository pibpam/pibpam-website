import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { Container } from './styles'

interface IBibleThemeToggle {
  dark: boolean
  onToggle: () => void
}

/** Alterna o tema claro/escuro da Bíblia (vai no `trailing` do AppHeader). */
const BibleThemeToggle: React.FC<IBibleThemeToggle> = ({ dark, onToggle }) => (
  <Container
    type="button"
    $dark={dark}
    onClick={onToggle}
    aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'}
  >
    {dark ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
  </Container>
)

export default BibleThemeToggle
