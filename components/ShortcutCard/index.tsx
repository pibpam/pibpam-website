import React from "react";
import { FiChevronRight, FiExternalLink } from "react-icons/fi";
import IconTile from "../IconTile";
import { Container, Text, Trailing } from "./styles";

interface IShortcutCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  // Sinaliza que o atalho abre fora do app (ex.: site da igreja).
  external?: boolean;
  // Layout em linha (ícone, texto e seta), para atalhos de destaque em largura total.
  horizontal?: boolean;
  onClick: () => void;
}

const ShortcutCard: React.FC<IShortcutCardProps> = ({
  icon,
  title,
  description,
  external,
  horizontal = false,
  onClick,
}) => (
  <Container type="button" $horizontal={horizontal} onClick={onClick}>
    <IconTile variant={horizontal ? "solid" : "soft"} size={horizontal ? 48 : 40}>
      {icon}
    </IconTile>
    <Text>
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </Text>
    {(external || horizontal) && (
      <Trailing aria-hidden $corner={!horizontal}>
        {external ? <FiExternalLink /> : <FiChevronRight />}
      </Trailing>
    )}
  </Container>
);

export default ShortcutCard;
