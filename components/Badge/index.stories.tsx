import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./index";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { variant: "neutral", children: "Pendente" },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Encerrado" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pendente" },
};

export const Success: Story = {
  args: { variant: "success", children: "Confirmada" },
};

export const Error: Story = {
  args: { variant: "error", children: "Cancelada" },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Lote atual" },
};

export const Soft: Story = {
  args: { variant: "soft", children: "Em breve" },
};
