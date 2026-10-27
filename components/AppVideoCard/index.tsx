import React, { ComponentProps } from 'react'
import { VideoCard } from '@/components/media/VideoCard'
import AppLinkScope from '../AppLinkScope'
import { IContent } from '../../interfaces/Contens'

type IAppVideoCard = Omit<ComponentProps<typeof VideoCard>, 'content'> & {
  content: IContent
}

/** Card de culto/mensagem do site; o clique abre /event/[id] no app. */
const AppVideoCard: React.FC<IAppVideoCard> = (props) => (
  <AppLinkScope>
    <VideoCard {...props} />
  </AppLinkScope>
)

export default AppVideoCard
