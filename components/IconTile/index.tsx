import React from "react";
import { IconTile as StyledIconTile, IconTileVariant } from "./styles";

export type { IconTileVariant };

interface IIconTileProps {
  variant?: IconTileVariant;
  size?: number;
  children: React.ReactNode;
}

const IconTile: React.FC<IIconTileProps> = ({
  variant = "neutral",
  size = 36,
  children,
}) => (
  <StyledIconTile $variant={variant} $size={size}>
    {children}
  </StyledIconTile>
);

export default IconTile;
