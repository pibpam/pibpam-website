import React from 'react'
import Image from 'next/image'
import { FiClock } from 'react-icons/fi'
import { dateParts, formatTime } from '@/lib/format'
import { IScheduleDate } from '../../interfaces/Schedule'

interface IAgendaHighlight {
  schedule: IScheduleDate
  onClick: () => void
}

/** Card de destaque da agenda: imagem do evento com data e horário. */
const AgendaHighlight: React.FC<IAgendaHighlight> = ({ schedule, onClick }) => {
  const { day, month } = dateParts(schedule.scheduleDate)
  const { title, shortDescription, image } = schedule.schedule

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-md bg-pine text-left text-ink-inverse"
    >
      <span className="relative block aspect-video w-full">
        {image && <Image src={image} alt="" fill sizes="80vw" className="object-cover" />}
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--pine)_0%,transparent_70%)]" />
        <span className="absolute top-3 left-3 flex flex-col items-center rounded-sm bg-accent px-3 py-1.5 leading-none text-pine">
          <span className="text-2xl font-extrabold tabular-nums">{day}</span>
          <span className="mt-0.5 text-xs font-bold uppercase">{month}</span>
        </span>
      </span>
      <span className="flex flex-col gap-1 px-4 py-4">
        <span className="text-lg font-bold tracking-tight text-balance">{title.trim()}</span>
        {shortDescription && <span className="line-clamp-2 text-ink-inverse-muted">{shortDescription}</span>}
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          <FiClock aria-hidden /> {formatTime(schedule.scheduleDate)}
        </span>
      </span>
    </button>
  )
}

export default AgendaHighlight
