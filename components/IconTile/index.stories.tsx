import type { Meta, StoryObj } from "@storybook/react";
import { FiTag } from "react-icons/fi";
import IconTile from "./index";

const meta: Meta<typeof IconTile> = {
  title: "Components/IconTile",
  component: IconTile,
};

export default meta;
type Story = StoryObj<typeof IconTile>;

export const Neutral: Story = {
  args: { variant: "neutral", children: <FiTag /> },
};

export const Soft: Story = {
  args: { variant: "soft", children: <FiTag /> },
};

export const Solid: Story = {
  args: { variant: "solid", children: <FiTag /> },
};

export const Muted: Story = {
  args: { variant: "muted", children: <FiTag /> },
};
