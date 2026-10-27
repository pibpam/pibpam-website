import React, { ComponentProps } from 'react'
import { SeriesCard } from '@/components/media/SeriesCard'
import AppLinkScope from '../AppLinkScope'
import { ISeries } from '../../interfaces/Series'

type IAppSeriesCard = Omit<ComponentProps<typeof SeriesCard>, 'series'> & {
  series: ISeries
}

/** Card de série do site; o clique abre /series/[id] no app. */
const AppSeriesCard: React.FC<IAppSeriesCard> = (props) => (
  <AppLinkScope>
    <SeriesCard {...props} />
  </AppLinkScope>
)

export default AppSeriesCard
