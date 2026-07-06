import type { Meta, StoryObj } from '@storybook/react'
import theme from './theme'

const sizes = [14, 16, 18, 20, 24, 32]
const weights = [400, 500, 600, 700]

const TypeScale = () => (
  <div style={{ fontFamily: theme.fontFamily }}>
    <h3>Font family</h3>
    <p style={{ fontSize: 16 }}>{theme.fontFamily}</p>

    <h3>Sizes</h3>
    {sizes.map((size) => (
      <div key={size} style={{ fontSize: size, marginBottom: 8 }}>
        {size}px — Ágape, Adoração e Comunhão
      </div>
    ))}

    <h3>Weights</h3>
    {weights.map((weight) => (
      <div key={weight} style={{ fontSize: 20, fontWeight: weight, marginBottom: 8 }}>
        {weight} — Ágape, Adoração e Comunhão
      </div>
    ))}
  </div>
)

const meta: Meta<typeof TypeScale> = {
  title: 'Design System/Typography',
  component: TypeScale,
}

export default meta

type Story = StoryObj<typeof TypeScale>

export const Scale: Story = {}
