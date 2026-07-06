import type { Meta, StoryObj } from '@storybook/react'
import theme from './theme'

const SpacingScale = () => (
  <div>
    <h3>Spacing</h3>
    {Object.entries(theme.spacing).map(([name, value]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ width: 60, fontFamily: 'monospace', fontSize: 13 }}>{name}</div>
        <div style={{ width: value, height: 16, backgroundColor: theme.colors.primary }} />
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{value}</div>
      </div>
    ))}

    <h3 style={{ marginTop: 24 }}>Border radius</h3>
    {Object.entries(theme.radius).map(([name, value]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ width: 60, fontFamily: 'monospace', fontSize: 13 }}>{name}</div>
        <div
          style={{
            width: 60,
            height: 32,
            backgroundColor: theme.colors.secondary,
            borderRadius: value,
          }}
        />
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{value}</div>
      </div>
    ))}
  </div>
)

const meta: Meta<typeof SpacingScale> = {
  title: 'Design System/Spacing & Radius',
  component: SpacingScale,
}

export default meta

type Story = StoryObj<typeof SpacingScale>

export const Scale: Story = {}
