import React, { ComponentProps } from 'react'
import { Button } from '@/components/ui/Button'
import useSiteNavigation from '../../hooks/useSiteNavigation'

type IAppButton = ComponentProps<typeof Button> & {
  /** Rota do app (ou URL externa) aberta ao clicar. */
  href?: string
}

/** Botão do site com navegação do app: no lugar do ButtonLink, que usa next/link. */
const AppButton: React.FC<IAppButton> = ({ href, onClick, ...props }) => {
  const navigate = useSiteNavigation()

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (href && !event.defaultPrevented) {
          navigate(href)
        }
      }}
    />
  )
}

export default AppButton
