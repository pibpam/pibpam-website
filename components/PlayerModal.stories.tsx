import type { Meta, StoryObj } from '@storybook/react'
import PlayerModal from './PlayerModal'

const meta: Meta<typeof PlayerModal> = {
  title: 'Overlays/PlayerModal',
  component: PlayerModal,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Culto de Celebração',
    description: 'Assista ao culto de domingo',
    thumb: '/igreja.jpg',
    videoId: 'dQw4w9WgXcQ',
    onClose: () => {},
  },
}

export default meta

type Story = StoryObj<typeof PlayerModal>

export const Default: Story = {}
