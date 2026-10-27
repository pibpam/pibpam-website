import React, { ReactNode, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiChevronLeft } from 'react-icons/fi'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { PostMessageContext } from '../../contexts/postMessage'
import { Back, Container, Content, Logo, Title, Trailing } from './styles'

interface IAppHeader {
  /** Sem título mostra o logo, que leva à Home. */
  title?: string
  /** Por padrão toda tela, exceto a Home, volta pelo histórico do app. */
  onBack?: () => void
  tone?: 'light' | 'dark'
  trailing?: ReactNode
}

/**
 * Cabeçalho único das telas: fica no fluxo (sticky), sem hero escuro. Respeita
 * a área segura do aparelho: `deviceInfo.top` vem do app nativo e, até chegar
 * (ou fora do app), vale o env(safe-area-inset-top) do navegador.
 */
const AppHeader: React.FC<IAppHeader> = ({ title, onBack, tone = 'light', trailing }) => {
  const router = useRouter()
  const { deviceInfo } = useContext(PostMessageContext)
  const { goTo, goBack } = useAppNavigation()
  const dark = tone === 'dark'

  const handleBack = onBack ?? (router.pathname !== '/' ? () => goBack({}) : undefined)
  const goToHome = () => goTo({ pathname: '/', showLoading: true, resetHistory: true })

  return (
    <Container
      $dark={dark}
      style={{
        paddingTop: `calc(max(${deviceInfo?.top ?? 0}px, env(safe-area-inset-top, 0px)) + 12px)`,
      }}
    >
      <Content>
        {handleBack && (
          <Back $dark={dark} onClick={handleBack} aria-label="Voltar">
            <FiChevronLeft />
          </Back>
        )}
        {title ? (
          <Title $dark={dark}>{title}</Title>
        ) : (
          <Logo onClick={goToHome} aria-label="Ir para o início">
            <Image src="/pibpam-logo.svg" alt="PIB Pará de Minas" width={120} height={31} />
          </Logo>
        )}
        {trailing && <Trailing>{trailing}</Trailing>}
      </Content>
    </Container>
  )
}

export default AppHeader
