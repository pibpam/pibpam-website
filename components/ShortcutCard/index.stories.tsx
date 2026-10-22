import type { Meta, StoryObj } from "@storybook/react";
import { PiBookBookmark } from "react-icons/pi";
import ShortcutCard from "./index";

const meta: Meta<typeof ShortcutCard> = {
  title: "Cards/ShortcutCard",
  component: ShortcutCard,
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShortcutCard>;

export const Default: Story = {
  args: {
    icon: <PiBookBookmark />,
    title: "Plano de Leitura",
    description: "Comentada e devocional",
    onClick: () => {},
  },
};

export const Horizontal: Story = {
  args: {
    icon: <PiBookBookmark />,
    title: "Área de Membros",
    description: "Recursos para membresia e ministérios",
    horizontal: true,
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
};

export const External: Story = {
  args: {
    icon: <PiBookBookmark />,
    title: "Sobre a igreja",
    description: "Abre o site da PIBPAM",
    external: true,
    onClick: () => {},
  },
};
