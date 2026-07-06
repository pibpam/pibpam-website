import type { Meta, StoryObj } from '@storybook/react'
import YTPlayer from './YTPlayer'

const meta: Meta<typeof YTPlayer> = {
  title: 'Media/YTPlayer',
  component: YTPlayer,
  args: {
    videoId: 'dQw4w9WgXcQ',
  },
}

export default meta

type Story = StoryObj<typeof YTPlayer>

export const Default: Story = {}

export const WithThumb: Story = {
  args: {
    thumb: '/igreja.jpg',
  },
}
