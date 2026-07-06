import type { Meta, StoryObj } from '@storybook/react'
import CollectionCard from './index'
import { ICollection } from '../../interfaces/Collection'

const data: ICollection = {
  uuid: '1',
  title: 'Acampamento de Jovens 2026',
  image: '/igreja.jpg',
  collectionDate: '2026-07-05T00:00:00',
  photos: [
    { uuid: '1', title: 'Foto 1', image: '/igreja.jpg' },
    { uuid: '2', title: 'Foto 2', image: '/igreja.jpg' },
  ],
}

const meta: Meta<typeof CollectionCard> = {
  title: 'Cards/CollectionCard',
  component: CollectionCard,
  args: {
    data,
    onClick: () => {},
  },
}

export default meta

type Story = StoryObj<typeof CollectionCard>

export const Default: Story = {}
