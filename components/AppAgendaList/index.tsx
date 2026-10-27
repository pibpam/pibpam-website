import React, { ComponentProps } from 'react'
import { AgendaList } from '@/components/agenda/AgendaList'
import AppLinkScope from '../AppLinkScope'
import { IScheduleDate } from '../../interfaces/Schedule'

type IAppAgendaList = Omit<ComponentProps<typeof AgendaList>, 'items'> & {
  items: IScheduleDate[]
}

/** Lista cronológica da agenda do site; o clique abre /schedule/[id] no app. */
const AppAgendaList: React.FC<IAppAgendaList> = (props) => (
  <AppLinkScope>
    <AgendaList {...props} />
  </AppLinkScope>
)

export default AppAgendaList
