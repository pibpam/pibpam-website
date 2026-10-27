import type { Meta, StoryObj } from '@storybook/react'
import AppShareButton from './index'

const meta: Meta<typeof AppShareButton> = {
  title: 'Site/AppShareButton',
  component: AppShareButton,
  args: { url: 'https://pibpam.org/event/1', message: 'Culto de Celebração' },
}

export default meta

type Story = StoryObj<typeof AppShareButton>

export const Default: Story = {}
