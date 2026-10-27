import React from 'react'
import { ContentNav, type ContentTab } from '@/components/media/ContentNav'
import AppLinkScope from '../AppLinkScope'

export const APP_CONTENT_TABS: ContentTab[] = [
  { href: '/events', label: 'Cultos' },
  { href: '/series', label: 'Séries' },
  { href: '/live', label: 'Ao vivo' },
]

interface IAppContentTabs {
  /** href da aba ativa, por exemplo "/events". */
  current: string
  tabs?: ContentTab[]
}

/** Abas em pílula entre as listas de conteúdo, apontando para as rotas do app. */
const AppContentTabs: React.FC<IAppContentTabs> = ({ current, tabs = APP_CONTENT_TABS }) => (
  <AppLinkScope>
    <ContentNav current={current} tabs={tabs} />
  </AppLinkScope>
)

export default AppContentTabs
