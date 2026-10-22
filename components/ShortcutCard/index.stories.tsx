import type { Meta, StoryObj } from "@storybook/react";
import { PiBookBookmark } from "react-icons/pi";
import ShortcutCard from "./index";

const meta: Meta<typeof ShortcutCard> = {
  title: "Cards/ShortcutCard",
  component: ShortcutCard,
  decorators: [
    (Story) => (
      <div style={{ width: 170, height: 92 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <PiBookBookmark />,
    title: "Bíblia",
    description: "Leia a Palavra",
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ShortcutCard>;

export const Default: Story = {};

export const Tint: Story = {
  args: { tone: "tint" },
};

export const Lime: Story = {
  args: { tone: "lime" },
};

export const Compact: Story = {
  args: { size: "compact", title: "Séries" },
  decorators: [
    (Story) => (
      <div style={{ width: 80, height: 92 }}>
        <Story />
      </div>
    ),
  ],
};

export const Wide: Story = {
  args: {
    size: "wide",
    title: "Área de Membros",
    description: "Recursos para membresia e ministérios",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340, height: 64 }}>
        <Story />
      </div>
    ),
  ],
};

export const External: Story = {
  args: { title: "Sobre a igreja", external: true },
};
