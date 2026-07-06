import type { Meta, StoryObj } from '@storybook/react'
import Collections from './index'
import { ICollection } from '../../../interfaces/Collection'

const collections: ICollection[] = [
  {
    uuid: '1',
    title: 'Acampamento de Jovens 2026',
    image: '/igreja.jpg',
    collectionDate: '2026-07-05T00:00:00',
    photos: [{ uuid: '1', title: 'Foto 1', image: '/igreja.jpg' }],
  },
  {
    uuid: '2',
    title: 'Culto de Celebração',
    image: '/igreja.jpg',
    collectionDate: '2026-06-28T00:00:00',
    photos: [{ uuid: '1', title: 'Foto 1', image: '/igreja.jpg' }],
  },
]

const meta: Meta<typeof Collections> = {
  title: 'Home Sections/Collections',
  component: Collections,
  parameters: { layout: 'fullscreen' },
  args: {
    collections,
    goTo: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Collections>

export const Default: Story = {}
