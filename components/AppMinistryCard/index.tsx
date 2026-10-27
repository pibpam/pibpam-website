import React from 'react'
import { MinistryCard } from '@/components/ministry/MinistryCard'
import { ITeam } from '../../interfaces/Team'

interface IAppMinistryCard {
  data: ITeam
  onClick?: () => void
}

/**
 * Cartão de ministério do site alimentado com o ITeam do app. Quem lidera é
 * quem tem função cadastrada. O cartão do site não é link, então o clique
 * (abrir o ministério) fica por conta do app.
 */
const AppMinistryCard: React.FC<IAppMinistryCard> = ({ data, onClick }) => (
  <div
    role={onClick ? 'link' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={(event) => event.key === 'Enter' && onClick?.()}
    className={onClick ? 'cursor-pointer' : undefined}
  >
    <MinistryCard
      ministry={{
        uuid: data.uuid,
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        image: data.image,
        people: (data.teamMember ?? [])
          .filter((item) => item.member)
          .map((item) => ({
            uuid: item.uuid,
            name: item.member!.name,
            role: item.role,
            image: item.member!.image,
          })),
      }}
    />
  </div>
)

export default AppMinistryCard
