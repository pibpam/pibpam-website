import React, { ComponentProps, useContext } from 'react'
import { Backdrop } from '@/components/ambient/Backdrop'
import { LiveContext } from '@/components/live/LiveProvider'
import { LivesContext } from '../../contexts/lives'

type IAppBackdrop = ComponentProps<typeof Backdrop>

/**
 * Fundo imersivo das seções escuras (foto + degradê animado). O degradê acelera
 * e puxa para o lime quando há transmissão: o estado vem do LivesContext do app,
 * já que o LiveProvider do site consulta uma rota que o app não tem.
 * O pai precisa ser `relative isolate overflow-hidden bg-pine` (ou `<Section backdrop>`).
 */
const AppBackdrop: React.FC<IAppBackdrop> = (props) => {
  const { lives } = useContext(LivesContext)
  const live = lives?.[0]

  return (
    <LiveContext.Provider
      value={{
        // O app e o site guardam o mesmo broadcast, só que o do app traz mais campos.
        live: live ?? null,
        ready: true,
      }}
    >
      <Backdrop {...props} />
    </LiveContext.Provider>
  )
}

export default AppBackdrop
