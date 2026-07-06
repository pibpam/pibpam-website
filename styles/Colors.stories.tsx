import type { Meta, StoryObj } from '@storybook/react'
import theme from './theme'

const ColorGrid = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {Object.entries(theme.colors)
      .filter(([name]) => name !== 'secundary')
      .map(([name, value]) => (
        <div key={name} style={{ width: 140 }}>
          <div
            style={{
              width: 140,
              height: 80,
              borderRadius: 8,
              border: '1px solid #eee',
              backgroundColor: value,
            }}
          />
          <div style={{ fontFamily: 'monospace', fontSize: 13, marginTop: 4 }}>{name}</div>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{value}</div>
        </div>
      ))}
  </div>
)

const meta: Meta<typeof ColorGrid> = {
  title: 'Design System/Colors',
  component: ColorGrid,
}

export default meta

type Story = StoryObj<typeof ColorGrid>

export const Palette: Story = {}
