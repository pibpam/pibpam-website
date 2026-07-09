import React from "react";
import { Badge as StyledBadge, BadgeVariant } from "./styles";

export type { BadgeVariant };

interface IBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const Badge: React.FC<IBadgeProps> = ({ variant = "neutral", children }) => (
  <StyledBadge $variant={variant}>{children}</StyledBadge>
);

export default Badge;
