import type { Meta, StoryObj } from '@storybook/react'
import Carousel from './index'

const meta: Meta<typeof Carousel> = {
  title: 'Layout/Carousel',
  component: Carousel,
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: {
    children: (
      <>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            style={{
              width: 160,
              height: 100,
              marginRight: 16,
              display: 'inline-block',
              background: '#EEF4F4',
              borderRadius: 8,
            }}
          />
        ))}
      </>
    ),
  },
}
