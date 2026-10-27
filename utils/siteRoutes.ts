// Os componentes compartilhados do site (alias `@/*`) têm links para as rotas
// do site institucional. No app as mesmas telas vivem em outros caminhos.
const ROUTES: [RegExp, (match: RegExpMatchArray) => string][] = [
  [/^\/conteudos\/video\/([^/?#]+)/, (m) => `/event/${m[1]}`],
  [/^\/conteudos\/series\/([^/?#]+)/, (m) => `/series/${m[1]}`],
  [/^\/conteudos\/transmissoes\/?$/, () => '/events'],
  [/^\/conteudos\/series\/?$/, () => '/series'],
  [/^\/conteudos\/?$/, () => '/'],
  [/^\/ao-vivo\/?$/, () => '/live'],
  [/^\/agenda\/([^/?#]+)/, (m) => `/schedule/${m[1]}`],
  [/^\/agenda\/?$/, () => '/schedule'],
  [/^\/ministerios\/?$/, () => '/ministries'],
]

export const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/.test(href)

/** Traduz um href do site para o caminho equivalente no app; os demais passam intactos. */
export const mapSiteHref = (href: string) => {
  for (const [pattern, to] of ROUTES) {
    const match = href.match(pattern)
    if (match) return to(match)
  }
  return href
}
