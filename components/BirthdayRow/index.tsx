import React from 'react'
import { PiCake } from 'react-icons/pi'
import { IMemberBasic } from '../../interfaces/Member'
import Reveal from '../Reveal'
import { Highlight, Icon, Text } from './styles'

interface IBirthdayRow {
  member: IMemberBasic
  /** Faz aniversário hoje: ganha o destaque da Home. */
  today?: boolean
  index?: number
}

const BirthdayRow: React.FC<IBirthdayRow> = ({ member, today = false, index = 0 }) => {
  if (today) {
    return (
      <Reveal as="li" index={index} className="py-3">
        <Highlight data-birthday-today>
          <Icon>
            <PiCake />
          </Icon>
          <Text>
            <strong>Hoje tem aniversário!</strong>
            <span>{member.name}</span>
          </Text>
        </Highlight>
      </Reveal>
    )
  }

  return (
    <Reveal as="li" index={index} className="flex items-center gap-4 py-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-extrabold text-brand-strong tabular-nums">
        {member.birthday}
      </span>
      <span className="min-w-0 font-semibold text-balance">{member.name}</span>
    </Reveal>
  )
}

export default BirthdayRow
